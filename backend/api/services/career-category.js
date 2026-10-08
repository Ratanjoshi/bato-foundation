const { careerCategoryModel, careerModel } = require("../../models");
const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const create = async (req) => {
  try {
    req.body.slug = slugGenerator(req.body.name);
    const isSlug = await careerCategoryModel.findOne({
      where: {
        slug: req.body.slug,
      },
    });
    if (isSlug) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_NAME_ALREADY_USED,
        data: null,
      };
    }
    const result = await careerCategoryModel.create(req.body);
    if (!result) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CREATE_CAREER_CATEGORY_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.CAREER_CATEGORY.CREATE_CAREER_CATEGORY_SUCCESS,
      data: result,
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

    if (slug) {
      filters.slug = {
        [Op.like]: `%${slug}%`,
      };
    }

    const careerCategories = await paginate(careerCategoryModel, {
      filters,
      include,
      page,
      limit,
    });

    if (!careerCategories) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_LIST_SUCCESS,
      data: careerCategories,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const careerCategory = await careerCategoryModel.findByPk(+req.params.id, {
      include: [
        {
          model: careerModel,
          as: "career",
        },
      ],
    });

    if (!careerCategory) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_FOUND,
      data: careerCategory,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const { id } = req.params;
    req.body.slug = slugGenerator(req.body.name);
    const isSlug = await careerCategoryModel.findOne({
      where: {
        slug: req.body.slug,
      },
    });
    if (isSlug && isSlug.id !== id) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_NAME_ALREADY_USED,
        data: null,
      };
    }
    const careerCategory = await careerCategoryModel.findByPk(id);
    if (!careerCategory) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    await careerCategory.update(req.body);

    return {
      ...generalConstant.EN.CAREER_CATEGORY.UPDATE_CAREER_CATEGORY_SUCCESS,
      data: careerCategory,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const { id } = req.params;
    const careerCategory = await careerCategoryModel.findByPk(id);
    if (!careerCategory) {
      return {
        ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    await careerCategory.destroy();

    return {
      ...generalConstant.EN.CAREER_CATEGORY.CAREER_CATEGORY_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, update, remove, getById, list };
