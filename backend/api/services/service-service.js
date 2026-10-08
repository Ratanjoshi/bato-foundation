const {
  serviceModel,
  technologyStackModel,
  technologyModel,
  serviceUsedCaseModel,
} = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  const transaction = await sequelize.transaction({ autocommit: false });

  try {
    const { useCases, techStack, ...rest } = req.body;
    rest.slug = slugGenerator(rest.name);

    // Check if slug already exists
    const existingService = await serviceModel.findOne({
      where: { slug: rest.slug },
    });

    if (existingService) {
      await transaction.rollback();
      return { ...generalConstant.EN.SERVICE.SLUG_EXISTS, data: null };
    }

    rest.seo_og_title = rest.name;
    rest.seo_og_description = rest.description.slice(0, 255);

    // Create Service inside the transaction
    const service = await serviceModel.create(rest, { transaction });

    // Handling Use Cases
    if (useCases && useCases.length > 0) {
      const useCasesData = useCases.map((useCase) => ({
        ...useCase,
        serviceId: service.id,
      }));

      await serviceUsedCaseModel.bulkCreate(useCasesData, { transaction });
    }

    // Handling Tech Stack
    if (techStack && techStack.length > 0) {
      for (const stack of techStack) {
        // Create a TechnologyStack entry
        const techStackEntry = await technologyStackModel.create(
          {
            title: stack.title,
            serviceId: service.id,
          },
          { transaction },
        );

        // Add the selected technologies (choosed)
        if (stack.choosed && stack.choosed.length > 0) {
          const choosedTechnologyIds = stack.choosed.map((tech) => tech.id);
          await techStackEntry.addTechnologies(choosedTechnologyIds, {
            transaction,
          });
        }
      }
    }

    // Commit the transaction only when everything succeeds
    await transaction.commit();

    // Fetch the service along with related data after commit
    const serviceWithDetails = await serviceModel.findOne({
      where: { id: service.id },
      include: [
        { model: serviceUsedCaseModel, as: "useCases" },
        {
          model: technologyStackModel,
          as: "techStacks",
          include: [{ model: technologyModel, as: "technologies" }],
        },
      ],
    });

    return {
      ...generalConstant.EN.SERVICE.CREATE_SERVICE_SUCCESS,
      data: serviceWithDetails,
    };
  } catch (error) {
    console.error("Service creation failed:", error);

    if (transaction.finished !== "commit") {
      await transaction.rollback();
    }

    return { ...generalConstant.EN.SERVICE.CREATE_SERVICE_FAILURE, data: null };
  }
};

const list = async (req) => {
  try {
    const { page, limit, title } = req.query;
    const filters = {};
    const include = [];

    if (title) {
      filters.title = {
        [Op.like]: `%${title}%`,
      };
    }

    const services = await paginate(serviceModel, {
      filters,
      include,
      page,
      limit,
    });
    if (!services) {
      return {
        ...generalConstant.EN.SERVICE.SERVICE_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.SERVICE.SERVICE_LIST_SUCCESS,
      data: services,
    };
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    const service = await serviceModel.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: serviceUsedCaseModel, as: "useCases" },
        {
          model: technologyStackModel,
          as: "techStacks",
          include: [{ model: technologyModel, as: "technologies" }],
        },
      ],
    });

    if (!service) {
      return { ...generalConstant.EN.SERVICE.SERVICE_NOT_FOUND, data: null };
    }
    return {
      ...generalConstant.EN.SERVICE.SERVICE_FOUND,
      data: service,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  const transaction = await sequelize.transaction({ autocommit: false });

  try {
    const service = await serviceModel.findByPk(req.params.id);
    if (!service) {
      await transaction.rollback();
      return { ...generalConstant.EN.SERVICE.SERVICE_NOT_FOUND, data: null };
    }

    const { useCases, techStack, ...updateData } = req.body;

    if (updateData.name) {
      const newSlug = slugGenerator(updateData.name);

      // Check if the slug already exists in another record
      const existingService = await serviceModel.findOne({
        where: { slug: newSlug, id: { [Op.ne]: service.id } },
      });

      if (existingService) {
        await transaction.rollback();
        return {
          success: false,
          message: "Slug must be unique. Another service is already using it.",
          data: null,
        };
      }

      updateData.slug = newSlug;
    }

    updateData.seo_og_title = updateData.name;
    updateData.seo_og_description = updateData.description.slice(0, 255);

    // Update service details
    console.log("updateData", updateData);
    await service.update(updateData, { transaction });

    // Handling Use Cases
    if (useCases) {
      await serviceUsedCaseModel.destroy({
        where: { serviceId: service.id },
        transaction,
      });

      if (useCases.length > 0) {
        const useCasesData = useCases.map((useCase) => ({
          ...useCase,
          serviceId: service.id,
        }));

        await serviceUsedCaseModel.bulkCreate(useCasesData, { transaction });
      }
    }

    // Handling Tech Stack
    if (techStack) {
      await technologyStackModel.destroy({
        where: { serviceId: service.id },
        transaction,
      });

      for (const stack of techStack) {
        // Create a new TechnologyStack entry
        const techStackEntry = await technologyStackModel.create(
          {
            title: stack.title,
            serviceId: service.id,
          },
          { transaction },
        );

        // Add the selected technologies
        if (stack.choosed && stack.choosed.length > 0) {
          const choosedTechnologyIds = stack.choosed.map((tech) => tech.id);
          await techStackEntry.addTechnologies(choosedTechnologyIds, {
            transaction,
          });
        }
      }
    }

    // Commit the transaction
    await transaction.commit();

    // Fetch the updated service with related details
    const updatedService = await serviceModel.findOne({
      where: { id: service.id },
      include: [
        { model: serviceUsedCaseModel, as: "useCases" },
        {
          model: technologyStackModel,
          as: "techStacks",
          include: [{ model: technologyModel, as: "technologies" }],
        },
      ],
    });

    return {
      ...generalConstant.EN.SERVICE.UPDATE_SERVICE_SUCCESS,
      data: updatedService,
    };
  } catch (error) {
    console.error("Service update failed:", error);

    if (transaction.finished !== "commit") {
      await transaction.rollback();
    }

    return {
      ...generalConstant.EN.SERVICE.UPDATE_SERVICE_FAILURE,
      message: error.message,
      data: null,
    };
  }
};

const remove = async (req) => {
  try {
    const service = await serviceModel.findByPk(req.params.id);
    if (!service) {
      return { ...generalConstant.EN.SERVICE.SERVICE_NOT_FOUND, data: null };
    }

    //Delete the service
    await service.destroy();

    return { ...generalConstant.EN.SERVICE.DELETE_SERVICE_SUCCESS, data: null };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getBySlug, update, remove };
