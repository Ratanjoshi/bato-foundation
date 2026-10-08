const {
  portfolioModel,
  portfolioMediaModel,
  portfolioSubImageModel,
  projectRequirementModel,
  serviceModel,
  testimonialModel,
} = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  console.log(req.body);
  req.body.slug = slugGenerator(req.body.slug);

  // checking if slug exists
  const portfolioExists = await portfolioModel.findOne({
    where: { slug: req.body.slug },
  });

  if (portfolioExists) {
    return { ...generalConstant.EN.PORTFOLIO.SLUG_EXISTS, data: null };
  }

  const transaction = await sequelize.transaction();
  try {
    const { imageArray, projectRequirement, subImages, ...rest } = req.body;

    const portfolio = await portfolioModel.create(
      {
        ...rest,
      },
      { transaction },
    );
    if (!portfolio) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PORTFOLIO.CREATE_PORTFOLIO_FAILURE,
        data: null,
      };
    }

    if (imageArray && imageArray.length > 0) {
      for (const image of imageArray) {
        await portfolioMediaModel.create(
          {
            portfolioId: portfolio.id,
            image,
          },
          { transaction },
        );
      }
    }

    if (subImages && subImages.length > 0) {
      for (const subImage of subImages) {
        await portfolioSubImageModel.create(
          {
            portfolioId: portfolio.id,
            title: subImage.title,
            svg_string: subImage.svg_string,
          },
          { transaction },
        );
      }
    }

    if (projectRequirement) {
      const data = await projectRequirementModel.create(
        {
          portfolioId: portfolio.id,
          title: projectRequirement.title,
          description: projectRequirement.description,
          requirements: projectRequirement.requirements,
        },
        { transaction },
      );
    }

    await transaction.commit();
    return {
      ...generalConstant.EN.PORTFOLIO.CREATE_PORTFOLIO_SUCCESS,
      data: portfolio,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return {
      ...generalConstant.EN.PORTFOLIO.CREATE_PORTFOLIO_FAILURE,
      data: null,
    };
  }
};

const list = async (req) => {
  try {
    console.log("service id");
    const { page, limit, title, serviceId } = req.query;
    const filters = {};
    const include = [
      {
        model: serviceModel,
        as: "service",
        attributes: ["name"],
      },
    ];

    if (title) {
      filters.title = {
        [Op.like]: `%${title}%`,
      };
    }

    if (serviceId) {
      filters.serviceId = Number(serviceId);
    }

    const portfolio = await paginate(portfolioModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!portfolio) {
      return {
        ...generalConstant.EN.PORTFOLIO.PORTFOLIO_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PORTFOLIO.PORTFOLIO_FOUND,
      data: portfolio,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const portfolio = await portfolioModel.findOne({
      where: { slug: req.params.id },
      include: [
        // {
        //   model: portfolioMediaModel,
        //   as: "portfolioMedia",
        // },
        // {
        //   model: portfolioSubImageModel,
        //   as: "subImages",
        // },
        {
          model: serviceModel,
          as: "service",
          attributes: ["name"],
        },
        {
          model: testimonialModel,
          as: "testimonial",
        },
        {
          model: projectRequirementModel,
          as: "projectRequirement",
        },
      ],
    });

    if (!portfolio) {
      return {
        ...generalConstant.EN.PORTFOLIO.PORTFOLIO_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PORTFOLIO.PORTFOLIO_FOUND,
      data: portfolio,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  console.log(req.params);
  req.body.slug = slugGenerator(req.body.slug);

  const portfolioExists = await portfolioModel.findByPk(req.params.id);

  if (!portfolioExists) {
    return {
      ...generalConstant.EN.PORTFOLIO.PORTFOLIO_NOT_FOUND,
      data: null,
    };
  }

  if (portfolioExists.slug !== req.body.slug) {
    const slugExists = await portfolioModel.findOne({
      where: { slug: req.body.slug },
    });
    if (slugExists) {
      return { ...generalConstant.EN.PORTFOLIO.SLUG_EXISTS, data: null };
    }
  }

  const transaction = await sequelize.transaction();
  try {
    const { imageArray, projectRequirement, subImages, ...updateData } =
      req.body;

    await portfolioExists.update({ ...updateData }, { transaction });

    // Updating portfolio images
    await portfolioMediaModel.destroy({
      where: { portfolioId: portfolioExists.id },
      transaction,
    });

    if (imageArray && imageArray.length > 0) {
      const portfolioData = imageArray.map((image) => ({
        portfolioId: portfolioExists.id,
        image,
      }));
      await portfolioMediaModel.bulkCreate(portfolioData, { transaction });
    }

    // Updating subImages
    await portfolioSubImageModel.destroy({
      where: { portfolioId: portfolioExists.id },
      transaction,
    });

    if (subImages && subImages.length > 0) {
      for (const subImage of subImages) {
        await portfolioSubImageModel.create(
          {
            portfolioId: portfolioExists.id,
            title: subImage.title,
            svg_string: subImage.svg_string,
          },
          { transaction },
        );
      }
    }

    // Updating project requirement
    await projectRequirementModel.destroy({
      where: { portfolioId: portfolioExists.id },
      transaction,
    });

    if (projectRequirement) {
      await projectRequirementModel.create(
        {
          portfolioId: portfolioExists.id,
          title: projectRequirement.title,
          description: projectRequirement.description,
          requirements: projectRequirement.requirements,
        },
        { transaction },
      );
    }

    await transaction.commit();
    return {
      ...generalConstant.EN.PORTFOLIO.UPDATE_PORTFOLIO_SUCCESS,
      data: portfolioExists,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return {
      ...generalConstant.EN.PORTFOLIO.UPDATE_PORTFOLIO_FAILURE,
      data: null,
    };
  }
};

const remove = async (req) => {
  try {
    const portfolio = await portfolioModel.findByPk(+req.params.id);

    if (!portfolio) {
      return {
        ...generalConstant.EN.PORTFOLIO.PORTFOLIO_NOT_FOUND,
        data: null,
      };
    }

    await portfolio.destroy();
    return {
      ...generalConstant.EN.PORTFOLIO.DELETE_PORTFOLIO_SUCCESS,
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
