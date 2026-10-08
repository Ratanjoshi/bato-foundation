const { subscribersModel, sequelize } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const { sendMail } = require("../../helpers/mailer/mailer");

const create = async (req) => {
  const transaction = await sequelize.transaction();
  try {
    const { email } = req.body;
    const isEmail = await subscribersModel.findOne({ where: { email } });
    if (isEmail) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_FOUND,
        data: null,
      };
    }
    const newsletter = await subscribersModel.create(req.body);
    if (!newsletter) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.SUBSCRIBERS.CREATE_SUBSCRIBERS_FAILURE,
        data: null,
      };
    }
    const placeholders = {
      name: `${req.body.email}`,
    };
    await sendMail("Subscription Added", placeholders, email);

    await transaction.commit();
    return {
      ...generalConstant.EN.SUBSCRIBERS.CREATE_SUBSCRIBERS_SUCCESS,
      data: newsletter,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page } = req.query;
    const filters = {};
    const include = [];

    const result = await paginate(subscribersModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const newsletter = await subscribersModel.findByPk(+req.params.id);
    if (!newsletter) {
      return {
        ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_FOUND,
      data: newsletter,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const newsletter = await subscribersModel.findByPk(+req.params.id);
    if (!newsletter) {
      return {
        ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_NOT_FOUND,
        data: null,
      };
    }

    const deleted = await newsletter.destroy();
    if (!deleted) {
      return {
        ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_DELETE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SUBSCRIBERS.SUBSCRIBERS_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  getById,
  deleteById,
};
