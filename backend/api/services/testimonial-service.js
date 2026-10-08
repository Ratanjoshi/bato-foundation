const { testimonialModel, portfolioModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const { Op } = require("sequelize");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const testimonial = await testimonialModel.create(req.body);
    if (!testimonial) {
      return {
        ...generalConstant.EN.TESTIMONIALS.CREATE_TESTIMONIAL_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.TESTIMONIALS.CREATE_TESTIMONIAL_SUCCESS,
      data: testimonial,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, name } = req.query;
    const filters = {};
    const include = [
      {
        model: portfolioModel,
        as: "portfolio",
        attributes: ["title"],
      },
    ];
    if (name) {
      filters.name = {
        [Op.like]: `%${name}`,
      };
    }
    const testimonial = await paginate(testimonialModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!testimonial) {
      return {
        ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_LIST_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_LIST_SUCCESS,
      data: testimonial,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    console.log(req.params.id);
    const testimonial = await testimonialModel.findByPk(req.params.id);
    if (!testimonial)
      return {
        ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_NOT_FOUND,
        data: null,
      };

    return {
      ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_FOUND,
      data: testimonial,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const testimonial = await testimonialModel.findByPk(req.params.id);
    if (!testimonial)
      return {
        ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_NOT_FOUND,
        data: null,
      };

    await testimonial.update(req.body);
    return {
      ...generalConstant.EN.TESTIMONIALS.UPDATE_TESTIMONIAL_SUCCESS,
      data: testimonial,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const testimonial = await testimonialModel.findByPk(req.params.id);
    if (!testimonial)
      return {
        ...generalConstant.EN.TESTIMONIALS.TESTIMONIAL_NOT_FOUND,
        data: null,
      };

    await testimonial.destroy();
    return {
      ...generalConstant.EN.TESTIMONIALS.DELETE_TESTIMONIAL_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
