const generalConstant = require("../../constants/general-constant");
const { blogModel, blogCategoryModel } = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const create = async (req) => {
  try {
    req.body.slug = slugGenerator(req.body.title);
    const result = await blogModel.create(req.body);

    if (!result) {
      return {
        ...generalConstant.EN.BLOG.CREATE_BLOG_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.BLOG.CREATE_BLOG_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, sort = "latest", blogCategoryId } = req.query;

    const filters = {};
    const include = [
      {
        model: blogCategoryModel,
        as: "blogs",
        attributes: ["id", "name"],
      },
    ];

    if (blogCategoryId) {
      filters.blogCategoryId = blogCategoryId;
    }

    let order = [["updatedAt", "DESC"]];

    if (sort === "oldest") {
      order = [["updatedAt", "ASC"]];
    }

    const result = await paginate(blogModel, {
      limit,
      page,
      filters,
      order,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.BLOG.BLOG_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.BLOG.BLOG_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await blogModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG.BLOG_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.BLOG.BLOG_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    const result = await blogModel.findOne({
      where: { slug: req.params.slug },
    });
    if (!result) {
      return {
        ...generalConstant.EN.BLOG.BLOG_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.BLOG.BLOG_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const result = await blogModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG.BLOG_UPDATE_FAILURE,
        data: null,
      };
    }
    req.body.slug = slugGenerator(req.body.title);
    await result.update(req.body);
    return {
      ...generalConstant.EN.BLOG.BLOG_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await blogModel.findByPk(+req.params.id);
    if (!result) {
      return {
        ...generalConstant.EN.BLOG.BLOG_DELETE_FAILURE,
        data: null,
      };
    }
    await result.destroy();
    return {
      ...generalConstant.EN.BLOG.BLOG_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  getBySlug,
  getById,
  update,
  deleteById,
};
