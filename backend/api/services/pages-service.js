const { pagesModel } = require("../../models");
const { Op } = require("sequelize"); // Import Sequelize operators
const generalConstant = require("../../constants/general-constant");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const create = async (req) => {
  try {
    const body = req.body;
    body.slug = slugGenerator(body.title);
    const page = await pagesModel.create(body);
    if (!page) {
      return {
        ...generalConstant.EN.PAGES.CREATE_PAGES_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PAGES.CREATE_PAGES_SUCCESS,
      data: page,
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
        [Op.like]: `%${title}%`,
      };
    }

    const result = await paginate(pagesModel, {
      limit,
      page,
      filters,
      include,
    });

    if (!result) {
      return {
        ...generalConstant.EN.PAGES.PAGES_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PAGES.PAGES_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const page = await pagesModel.findByPk(+req.params.id);
    if (!page) {
      return {
        ...generalConstant.EN.PAGES.PAGES_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PAGES.PAGES_FOUND,
      data: page,
    };
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    const page = await pagesModel.findOne({ where: { slug: req.params.slug } });
    if (!page) {
      return {
        ...generalConstant.EN.PAGES.PAGES_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.PAGES.PAGES_FOUND,
      data: page,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const page = await pagesModel.findByPk(+req.params.id);
    if (!page) {
      return {
        ...generalConstant.EN.PAGES.PAGES_NOT_FOUND,
        data: null,
      };
    }
    const body = req.body;
    body.slug = slugGenerator(body.title);
    await page.update(body);
    return {
      ...generalConstant.EN.PAGES.PAGES_UPDATE_SUCCESS,
      data: page,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const page = await pagesModel.findByPk(+req.params.id);
    if (!page) {
      return {
        ...generalConstant.EN.PAGES.PAGES_NOT_FOUND,
        data: null,
      };
    }
    await page.destroy();
    return {
      ...generalConstant.EN.PAGES.PAGES_DELETE_SUCCESS,
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
  getBySlug,
  update,
  deleteById,
};
