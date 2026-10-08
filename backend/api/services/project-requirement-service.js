const { projectRequirementModel, requirementModel } = require("../../models");
const { Op } = require("sequelize"); // Import Sequelize operators
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");

const create = async (req) => {
  try {
    const projectRequirement = await projectRequirementModel.create(req.body);

    if (!projectRequirement) {
      return {
        ...generalConstant.EN.PROJECT_REQUIREMENT
          .CREATE_PROJECT_REQUIREMENT_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PROJECT_REQUIREMENT
        .CREATE_PROJECT_REQUIREMENT_SUCCESS,
      data: projectRequirement,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, title } = req.query;
    const filters = {};
    const include = [{ model: requirementModel, as: "requirements" }];

    if (title) {
      filters.title = {
        [Op.like]: `%${title}%`,
      };
    }

    const result = await paginate(projectRequirementModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_REQUIREMENT
          .PROJECT_REQUIREMENT_LIST_SUCCESS,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PROJECT_REQUIREMENT
        .PROJECT_REQUIREMENT_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const projectRequirement = await projectRequirementModel.findByPk(
      +req.params.id,
      {
        include: [{ model: requirementModel, as: "requirements" }],
      },
    );

    if (!projectRequirement) {
      return {
        ...generalConstant.EN.PROJECT_REQUIREMENT.PROJECT_REQUIREMENT_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PROJECT_REQUIREMENT.PROJECT_REQUIREMENT_FOUND,
      data: projectRequirement,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const projectRequirement = await projectRequirementModel.findByPk(
      +req.params.id,
    );
    if (!projectRequirement) {
      return {
        ...generalConstant.EN.PROJECT_REQUIREMENT.PROJECT_REQUIREMENT_NOT_FOUND,
        data: null,
      };
    }
    await projectRequirement.update(req.body);
    return {
      ...generalConstant.EN.PROJECT_REQUIREMENT
        .UPDATE_PROJECT_REQUIREMENT_SUCCESS,
      data: projectRequirement,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const projectRequirement = await projectRequirementModel.findByPk(
      +req.params.id,
    );
    if (!projectRequirement) {
      return {
        ...generalConstant.EN.PROJECT_REQUIREMENT.PROJECT_REQUIREMENT_NOT_FOUND,
        data: null,
      };
    }
    await projectRequirement.destroy();
    return {
      ...generalConstant.EN.PROJECT_REQUIREMENT
        .DELETE_PROJECT_REQUIREMENT_SUCCESS,
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
