const { serviceUsedCaseModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const { Op } = require("sequelize");
const paginate = require("../../utils/paginate");

const create = async (req) => {
  try {
    // console.log(technologyModel)
    const Usedcases = await serviceUsedCaseModel.create(req.body);

    if (!Usedcases) {
      return {
        ...generalConstant.EN.SERVICE_USED_CASES
          .CREATE_SERVICE_USED_CASES_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SERVICE_USED_CASES
        .CREATE_SERVICE_USED_CASES_SUCCESS,
      data: Usedcases,
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
    const cases = await paginate(serviceUsedCaseModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!cases) {
      return {
        ...generalConstant.EN.SERVICE_USED_CASES
          .SERVICE_USED_CASES_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.SERVICE_USED_CASES.SERVICE_USED_CASES_LIST_SUCCESS,
      data: cases,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const usedCase = await serviceUsedCaseModel.findByPk(req.params.id);
    if (!usedCase)
      return {
        ...generalConstant.EN.SERVICE_USED_CASES.SERVICE_USED_CASES_NOT_FOUND,
        data: null,
      };
    return {
      ...generalConstant.EN.SERVICE_USED_CASES.SERVICE_USED_CASES_FOUND,
      data: usedCase,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const Usedcase = await serviceUsedCaseModel.findByPk(req.params.id);
    if (!Usedcase)
      return {
        ...generalConstant.EN.SERVICE_USED_CASES.SERVICE_USED_CASES_NOT_FOUND,
        data: null,
      };

    await Usedcase.update(req.body);
    return {
      ...generalConstant.EN.SERVICE_USED_CASES
        .UPDATE_SERVICE_USED_CASES_SUCCESS,
      data: Usedcase,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const usedcase = await serviceUsedCaseModel.findByPk(req.params.id);
    if (!usedcase)
      return {
        ...generalConstant.EN.SERVICE_USED_CASES.SERVICE_USED_CASES_NOT_FOUND,
        data: null,
      };
    await usedcase.destroy();
    return {
      ...generalConstant.EN.SERVICE_USED_CASES
        .DELETE_SERVICE_USED_CASES_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
