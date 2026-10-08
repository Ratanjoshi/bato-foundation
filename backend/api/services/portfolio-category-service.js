const {
  portfolioCategoryModel,
  portfolioModel,
  portfolioMediaModel,
  portfolioSubImageModel,
} = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const portfolioCategory = await portfolioCategoryModel.create(req.body);
    if (!portfolioCategory) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY
          .CREATE_PORTFOLIO_CATEGORY_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY
        .CREATE_PORTFOLIO_CATEGORY_SUCCESS,
      data: portfolioCategory,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { page, limit, slug } = req.query;
    const filters = {};
    const include = [];
    // const include = [
    //   {
    //     model: portfolioModel,
    //     as: "portfolios",
    //   },
    // ];

    if (slug) {
      filters.slug = {
        [Op.like]: `%${slug}%`,
      };
    }

    const portfolioCategories = await paginate(portfolioCategoryModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!portfolioCategories) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.GET_PORTFOLIO_CATEGORY_SUCCESS,
      data: portfolioCategories,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const portfolioCategory = await portfolioCategoryModel.findByPk(
      +req.params.id,
      {
        // include: [
        //   {
        //     model: portfolioModel,
        //     as: "portfolios",
        //     include: [
        //       {
        //         model: portfolioMediaModel,
        //         as: "portfolioMedia",
        //       },
        //       {
        //         model: portfolioSubImageModel,
        //         as: "subImages",
        //       },
        //     ],
        //   },
        // ],
      },
    );

    if (!portfolioCategory) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_FOUND,
      data: portfolioCategory,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const { id } = req.params;
    const portfolioCategory = await portfolioCategoryModel.findByPk(id);
    if (!portfolioCategory) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    await portfolioCategory.update(req.body);

    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY
        .UPDATE_PORTFOLIO_CATEGORY_SUCCESS,
      data: portfolioCategory,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const { id } = req.params;
    const portfolioCategory = await portfolioCategoryModel.findByPk(id);
    if (!portfolioCategory) {
      return {
        ...generalConstant.EN.PORTFOLIO_CATEGORY.PORTFOLIO_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    await portfolioCategory.destroy();

    return {
      ...generalConstant.EN.PORTFOLIO_CATEGORY
        .DELETE_PORTFOLIO_CATEGORY_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, update, remove, getById, list };
