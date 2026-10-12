"use strict";

const { Op } = require("sequelize");
const { BatoProgram } = require("../../models");
const paginate = require("../../utils/paginate");
const generalConstant = require("../../constants/general-constant");

const list = async (req, publishedOnly = false) => {
  const { page, limit, category, status, isPublished, search } =
    req.validatedQuery || req.query;
  const filters = {};

  if (publishedOnly) filters.isPublished = true;
  else if (isPublished !== undefined) filters.isPublished = isPublished;
  if (category) filters.category = category;
  if (status) filters.status = status;
  if (search) {
    filters[Op.or] = ["title", "description", "location"].map((field) => ({
      [field]: { [Op.like]: `%${search}%` },
    }));
  }

  const result = await paginate(BatoProgram, {
    page,
    limit,
    filters,
    order: [
      ["order", "ASC"],
      ["id", "ASC"],
    ],
  });

  return {
    ...generalConstant.EN.BATO_PROGRAM.LIST_SUCCESS,
    data: {
      rows: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.max(1, result.totalPages),
    },
  };
};

const create = async (req) => {
  const program = await BatoProgram.create(req.body);
  return {
    ...generalConstant.EN.BATO_PROGRAM.CREATE_SUCCESS,
    data: program,
  };
};

const getById = async (req) => {
  const program = await BatoProgram.findByPk(+req.params.id);
  return program
    ? { ...generalConstant.EN.BATO_PROGRAM.FOUND, data: program }
    : { ...generalConstant.EN.BATO_PROGRAM.NOT_FOUND, data: null };
};

const getPublishedBySlug = async (req) => {
  const program = await BatoProgram.findOne({
    where: { slug: req.params.slug, isPublished: true },
  });
  return program
    ? { ...generalConstant.EN.BATO_PROGRAM.FOUND, data: program }
    : { ...generalConstant.EN.BATO_PROGRAM.NOT_FOUND, data: null };
};

const update = async (req) => {
  const program = await BatoProgram.findByPk(+req.params.id);
  if (!program) {
    return { ...generalConstant.EN.BATO_PROGRAM.NOT_FOUND, data: null };
  }

  await program.update(req.body);
  return { ...generalConstant.EN.BATO_PROGRAM.UPDATE_SUCCESS, data: program };
};

const deleteById = async (req) => {
  const program = await BatoProgram.findByPk(+req.params.id);
  if (!program) {
    return { ...generalConstant.EN.BATO_PROGRAM.NOT_FOUND, data: null };
  }

  await program.destroy();
  return { ...generalConstant.EN.BATO_PROGRAM.DELETE_SUCCESS, data: null };
};

module.exports = {
  list,
  create,
  getById,
  getPublishedBySlug,
  update,
  deleteById,
};
