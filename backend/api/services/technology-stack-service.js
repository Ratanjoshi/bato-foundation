const { technologyStackModel, technologyModel } = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const { title, technologyIds, ...rest } = req.body;
    console.log("+++++++++++++++++++", req.body);

    // Create Technology Stack
    const techStack = await technologyStackModel.create({ title, ...rest });
    console.log("------------------------------", techStack);

    // If technologies are provided, associate them
    if (technologyIds && technologyIds.length > 0) {
      await techStack.addTechnologies(technologyIds);
    }

    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_CREATE_SUCCESS,
      data: techStack,
    };
  } catch (error) {
    console.error(error);
    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_CREATE_FAILURE,
      data: null,
    };
  }
};

const list = async (req) => {
  try {
    let { limit, page, title } = req.query;
    const filters = {};
    const include = [];
    if (title) {
      filters.title = {
        [Op.like]: `%${title}%`,
      };
    }

    const technologiesStack = await paginate(technologyStackModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!technologiesStack) {
      return {
        ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_LIST_SUCCESS,
      data: technologiesStack,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const techStack = await technologyStackModel.findOne({
      where: { id: req.params.id },
      include: [{ model: technologyModel, as: "technologies" }],
    });

    if (!techStack) {
      return {
        ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_GET_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_GET_SUCCESS,
      data: techStack,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (req) => {
  const transaction = await sequelize.transaction();
  try {
    // Fetch the technology stack by ID using the transaction to ensure consistency
    const techStack = await technologyStackModel.findByPk(req.params.id, {
      transaction,
    });

    if (!techStack) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_UPDATE_FAILURE,
        data: null,
      };
    }

    const { title, technologyIds, ...updateData } = req.body;

    // Update the technology stack details within the transaction
    await techStack.update({ ...updateData, title }, { transaction });

    // If technologyIds are provided, update or create associations
    if (technologyIds && technologyIds.length > 0) {
      // Remove existing technology associations within the transaction
      await techStack.setTechnologies([], { transaction });

      // Add new technologies to the technology stack
      await techStack.addTechnologies(technologyIds, { transaction });
    } else {
      // If no technologyIds are provided, remove all associations
      await techStack.setTechnologies([], { transaction });
    }

    // Commit the transaction if everything is successful
    await transaction.commit();
    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_UPDATE_SUCCESS,
      data: techStack,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return {
      ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_UPDATE_FAILURE,
      data: null,
    };
  }
};

const remove = async (req) => {
  try {
    const techStack = await technologyStackModel.findByPk(req.params.id);

    if (!techStack) {
      return {
        ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_DELETE_FAILURE,
        data: null,
      };
    }

    // Start transaction for consistency
    const transaction = await sequelize.transaction();
    try {
      // Remove associations with technologies
      await techStack.setTechnologies([], { transaction });

      // Delete the technology stack
      await techStack.destroy({ transaction });

      await transaction.commit();

      return {
        ...generalConstant.EN.TECHNOLOGY_STACK.TECHNOLOGY_STACK_DELETE_SUCCESS,
        data: null,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
