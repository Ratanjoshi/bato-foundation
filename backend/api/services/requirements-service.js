const { requirementModel } = require("../../models");
const { Op } = require("sequelize"); // Import Sequelize operators
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");

const create = async (req) => {
  try {
    const requirement = await requirementModel.create(req.body);
    if (!requirement) {
      return {
        ...generalConstant.EN.REQUIREMENTS.CREATE_REQUIREMENTS_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.REQUIREMENTS.CREATE_REQUIREMENTS_SUCCESS,
      data: requirement,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, requirementText } = req.query;
    const filters = {};
    const include = [];

    if (requirementText) {
      filters.requirementText = {
        [Op.like]: `%${requirementText}%`,
      };
    }

    const result = await paginate(requirementModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const requirement = await requirementModel.findByPk(+req.params.id);
    if (!requirement) {
      return {
        ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_FOUND,
      data: requirement,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const requirement = await requirementModel.findByPk(+req.params.id);
    if (!requirement) {
      return {
        ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_NOT_FOUND,
        data: null,
      };
    }
    await requirement.update(req.body);
    return {
      ...generalConstant.EN.REQUIREMENTS.UPDATE_REQUIREMENTS_SUCCESS,
      data: requirement,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const requirement = await requirementModel.findByPk(+req.params.id);
    if (!requirement) {
      return {
        ...generalConstant.EN.REQUIREMENTS.REQUIREMENTS_NOT_FOUND,
        data: null,
      };
    }
    await requirement.destroy();
    return {
      ...generalConstant.EN.REQUIREMENTS.DELETE_REQUIREMENTS_SUCCESS,
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
  update,
  remove,
};
