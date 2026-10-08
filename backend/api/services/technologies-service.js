const { technologyModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const { Op } = require("sequelize");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const technology = await technologyModel.create(req.body);
    if (!technology) {
      return {
        ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_CREATE_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_CREATE_SUCCESS,
      data: technology,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, name } = req.query;
    const filters = {};
    const include = [];
    if (name) {
      filters.name = {
        [Op.like]: `%${name}`,
      };
    }
    const technologies = await paginate(technologyModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!technologies) {
      return {
        ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_LIST_SUCCESS,
      data: technologies,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const technology = await technologyModel.findByPk(req.params.id);
    if (!technology)
      return {
        ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_GET_FAILURE,
        data: null,
      };

    return {
      ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_GET_SUCCESS,
      data: technology,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const technology = await technologyModel.findByPk(req.params.id);
    if (!technology)
      return {
        ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_UPDATE_FAILURE,
        data: null,
      };

    await technology.update(req.body);
    return {
      ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_UPDATE_SUCCESS,
      data: technology,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const technology = await technologyModel.findByPk(req.params.id);
    if (!technology)
      return {
        ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_DELETE_FAILURE,
        data: null,
      };

    await technology.destroy();
    return {
      ...generalConstant.EN.TECHNOLOGY.TECHNOLOGY_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
