const { faqModel } = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");

const create = async (req) => {
  try {
    const faq = await faqModel.create(req.body);
    if (!faq) {
      return {
        ...generalConstant.EN.FAQ.CREATE_FAQ_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.FAQ.CREATE_FAQ_SUCCESS,
      data: faq,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, pageName } = req.query;
    const filters = {};
    const include = [];

    if (pageName) {
      filters.pageName = {
        [Op.like]: `%${pageName}%`,
      };
    }

    const result = await paginate(faqModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.FAQ.FAQ_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.FAQ.FAQ_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const faq = await faqModel.findByPk(+req.params.id);
    if (!faq) {
      return {
        ...generalConstant.EN.FAQ.FAQ_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.FAQ.FAQ_GET_SUCCESS,
      data: faq,
    };
  } catch (error) {
    throw new AppError(error.message);
  }
};

const updateById = async (req) => {
  try {
    const faq = await faqModel.findByPk(+req.params.id);
    if (!faq) {
      return {
        ...generalConstant.EN.FAQ.FAQ_NOT_FOUND,
        data: null,
      };
    }

    const updated = await faq.update(req.body);
    if (!updated) {
      return {
        ...generalConstant.EN.FAQ.UPDATE_FAQ_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.FAQ.UPDATE_FAQ_SUCCESS,
      data: updated,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const faq = await faqModel.findByPk(+req.params.id);
    if (!faq) {
      return {
        ...generalConstant.EN.FAQ.FAQ_NOT_FOUND,
        data: null,
      };
    }

    const deleted = await faq.destroy();
    if (!deleted) {
      return {
        ...generalConstant.EN.FAQ.FAQ_DELETE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.FAQ.FAQ_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, updateById, deleteById };
