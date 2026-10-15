// backend/services/whatWeDoService.js
const { Op } = require("sequelize");
const { WhatWeDo } = require("../../models");

const slugify = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const buildWhere = (query = {}) => {
  const where = {};
  if (query.search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${query.search}%` } },
      { desc: { [Op.like]: `%${query.search}%` } },
    ];
  }
  if (query.isActive !== undefined) {
    where.isActive = query.isActive === "true" || query.isActive === true;
  }
  return where;
};

exports.list = async (query = {}) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { rows, count } = await WhatWeDo.findAndCountAll({
    where: buildWhere(query),
    order: [
      ["order", "ASC"],
      ["id", "ASC"],
    ],
    limit,
    offset,
  });

  return {
    items: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit) || 1,
    },
  };
};

exports.listPublic = async () => {
  return WhatWeDo.findAll({
    where: { isActive: true },
    order: [
      ["order", "ASC"],
      ["id", "ASC"],
    ],
    attributes: ["id", "icon", "title", "desc", "points", "image", "order"],
  });
};

exports.getById = async (id) => {
  const item = await WhatWeDo.findByPk(id);
  if (!item) {
    const err = new Error("WhatWeDo item not found");
    err.status = 404;
    throw err;
  }
  return item;
};

exports.create = async (payload) => {
  const data = { ...payload };
  if (!data.slug) data.slug = slugify(data.title);

  // Ensure unique slug
  const existing = await WhatWeDo.findOne({ where: { slug: data.slug } });
  if (existing) data.slug = `${data.slug}-${Date.now()}`;

  if (!Array.isArray(data.points)) data.points = [];
  return WhatWeDo.create(data);
};

exports.update = async (id, payload) => {
  const item = await exports.getById(id);
  const data = { ...payload };

  if (data.title && !data.slug) data.slug = slugify(data.title);

  if (data.slug && data.slug !== item.slug) {
    const existing = await WhatWeDo.findOne({ where: { slug: data.slug } });
    if (existing && existing.id !== item.id) {
      data.slug = `${data.slug}-${Date.now()}`;
    }
  }

  if (data.points && !Array.isArray(data.points)) data.points = [];

  await item.update(data);
  return item;
};

exports.remove = async (id) => {
  const item = await exports.getById(id);
  await item.destroy();
  return { id };
};

exports.reorder = async (orderedIds = []) => {
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    const err = new Error("orderedIds must be a non-empty array");
    err.status = 400;
    throw err;
  }
  await Promise.all(
    orderedIds.map((id, index) =>
      WhatWeDo.update({ order: index }, { where: { id } }),
    ),
  );
  return exports.listPublic();
};
