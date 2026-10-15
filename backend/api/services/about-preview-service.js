"use strict";

const { aboutPreviewModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");

const getPublic = async () => {
  const data = await aboutPreviewModel.findOne({
    where: { isPublished: true },
    order: [["id", "DESC"]],
  });

  return data
    ? { ...generalConstant.EN.ABOUT_PREVIEW.FOUND, data }
    : { ...generalConstant.EN.ABOUT_PREVIEW.NOT_FOUND, data: null };
};

const getForAdmin = async () => {
  const data = await aboutPreviewModel.findOne({ order: [["id", "DESC"]] });
  return { ...generalConstant.EN.ABOUT_PREVIEW.FOUND, data };
};

const create = async (req) => {
  const data = await aboutPreviewModel.create(req.body);
  return { ...generalConstant.EN.ABOUT_PREVIEW.CREATE_SUCCESS, data };
};

const update = async (req) => {
  const record = await aboutPreviewModel.findByPk(req.params.id);
  if (!record) {
    return { ...generalConstant.EN.ABOUT_PREVIEW.NOT_FOUND, data: null };
  }

  await record.update(req.body);
  return { ...generalConstant.EN.ABOUT_PREVIEW.UPDATE_SUCCESS, data: record };
};

module.exports = { getPublic, getForAdmin, create, update };
