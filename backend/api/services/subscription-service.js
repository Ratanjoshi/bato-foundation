const { subscriptionModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const { Op } = require("sequelize");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const subscription = await subscriptionModel.create(req.body);
    if (!subscription) {
      return {
        ...generalConstant.EN.SUBSCRIPTION.CREATE_SUBSCRIPTION_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SUBSCRIPTION.CREATE_SUBSCRIPTION_SUCCESS,
      data: subscription,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, title } = req.query;
    const filters = {};
    const include = [];
    if (title) {
      filters.title = {
        [Op.like]: `%${title}`,
      };
    }
    const subscriptions = await paginate(subscriptionModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!subscriptions) {
      return {
        ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_LIST_SUCCESS,
      data: subscriptions,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const subscription = await subscriptionModel.findByPk(req.params.id);
    if (!subscription)
      return {
        ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_NOT_FOUND,
        data: null,
      };

    return {
      ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_FOUND,
      data: subscription,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const subscription = await subscriptionModel.findByPk(req.params.id);
    if (!subscription)
      return {
        ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_NOT_FOUND,
        data: null,
      };

    await subscription.update(req.body);
    return {
      ...generalConstant.EN.SUBSCRIPTION.UPDATE_SUBSCRIPTION_SUCCESS,
      data: subscription,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const subscription = await subscriptionModel.findByPk(req.params.id);
    if (!subscription)
      return {
        ...generalConstant.EN.SUBSCRIPTION.SUBSCRIPTION_NOT_FOUND,
        data: null,
      };

    await subscription.destroy();
    return {
      ...generalConstant.EN.SUBSCRIPTION.DELETE_SUBSCRIPTION_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
