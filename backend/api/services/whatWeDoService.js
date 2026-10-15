const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const { WhatWeDo } = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const uniqueSlug = async (title, currentId) => {
  const slug = slugGenerator(title);
  const existing = await WhatWeDo.findOne({ where: { slug } });
  return existing && existing.id !== currentId ? `${slug}-${Date.now()}` : slug;
};

const create = async (req) => {
  const data = { ...req.body, slug: await uniqueSlug(req.body.title) };
  const result = await WhatWeDo.create(data);

  return {
    ...generalConstant.EN.WHAT_WE_DO.CREATE_SUCCESS,
    data: result,
  };
};

const list = async (req) => {
  const { limit, page, search, isActive } = req.query;
  const filter = {};

  if (search) {
    filter[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { desc: { [Op.like]: `%${search}%` } },
    ];
  }
  if (isActive !== undefined) filter.isActive = isActive === "true";

  const result = await paginate(WhatWeDo, {
    limit,
    page,
    filters: filter,
    order: [
      ["order", "ASC"],
      ["id", "ASC"],
    ],
  });

  return {
    ...generalConstant.EN.WHAT_WE_DO.LIST_SUCCESS,
    data: result,
  };
};

const listPublic = async () => {
  const result = await WhatWeDo.findAll({
    where: { isActive: true },
    order: [
      ["order", "ASC"],
      ["id", "ASC"],
    ],
    attributes: [
      "id",
      "icon",
      "title",
      "slug",
      "desc",
      "points",
      "image",
      "order",
    ],
  });

  return {
    ...generalConstant.EN.WHAT_WE_DO.LIST_SUCCESS,
    data: result,
  };
};

const getById = async (req) => {
  const result = await WhatWeDo.findByPk(req.params.id);

  return {
    ...(result
      ? generalConstant.EN.WHAT_WE_DO.FOUND
      : generalConstant.EN.WHAT_WE_DO.NOT_FOUND),
    data: result,
  };
};

const update = async (req) => {
  const result = await WhatWeDo.findByPk(req.params.id);
  if (!result) {
    return { ...generalConstant.EN.WHAT_WE_DO.NOT_FOUND, data: null };
  }

  const data = { ...req.body };
  if (data.title) data.slug = await uniqueSlug(data.title, result.id);
  await result.update(data);

  return {
    ...generalConstant.EN.WHAT_WE_DO.UPDATE_SUCCESS,
    data: result,
  };
};

const deleteById = async (req) => {
  const result = await WhatWeDo.findByPk(req.params.id);
  if (!result) {
    return { ...generalConstant.EN.WHAT_WE_DO.NOT_FOUND, data: null };
  }

  await result.destroy();
  return { ...generalConstant.EN.WHAT_WE_DO.DELETE_SUCCESS, data: null };
};

const reorder = async (req) => {
  const transaction = await WhatWeDo.sequelize.transaction();
  try {
    await Promise.all(
      req.body.orderedIds.map((id, index) =>
        WhatWeDo.update({ order: index }, { where: { id }, transaction }),
      ),
    );
    await transaction.commit();
    return listPublic();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  create,
  list,
  listPublic,
  getById,
  update,
  deleteById,
  reorder,
};
