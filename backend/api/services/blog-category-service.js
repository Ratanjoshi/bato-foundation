const generalConstant = require("../../constants/general-constant");
const { blogCategoryModel } = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const create = async (req) => {
  try {
    req.body.slug = slugGenerator(req.body.name);
    const result = await blogCategoryModel.create(req.body);

    if (!result) {
      return {
        ...generalConstant.EN.BLOG_CATEGORY.CREATE_BLOG_CATEGORY_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.BLOG_CATEGORY.CREATE_BLOG_CATEGORY_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, title } = req.query;

    const filters = {};
    const include = [];

    const result = await paginate(blogCategoryModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await blogCategoryModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const result = await blogCategoryModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_UPDATE_FAILURE,
        data: null,
      };
    }
    req.body.slug = slugGenerator(req.body.name);
    await result.update(req.body);
    return {
      ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await blogCategoryModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_DELETE_FAILURE,
        data: null,
      };
    }
    await result.destroy();
    return {
      ...generalConstant.EN.BLOG_CATEGORY.BLOG_CATEGORY_DELETE_SUCCESS,
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
  deleteById,
};
