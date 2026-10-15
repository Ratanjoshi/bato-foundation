const { UltimateDream } = require("../../models");
const generalConstant = require("../../constants/general-constant");

const getActive = async () => {
  const data = await UltimateDream.findOne({
    where: { is_active: true },
    order: [
      ["order", "ASC"],
      ["created_at", "DESC"],
    ],
  });

  return { ...generalConstant.EN.ULTIMATE_DREAM.FOUND, data };
};

const getForAdmin = async () => {
  const data = await UltimateDream.findOne({
    order: [["created_at", "DESC"]],
  });

  return { ...generalConstant.EN.ULTIMATE_DREAM.FOUND, data };
};

const create = async (req) => {
  const data = await UltimateDream.create(req.body);
  return { ...generalConstant.EN.ULTIMATE_DREAM.CREATE_SUCCESS, data };
};

const update = async (req) => {
  const record = await UltimateDream.findByPk(req.params.id);
  if (!record) {
    return { ...generalConstant.EN.ULTIMATE_DREAM.NOT_FOUND, data: null };
  }

  await record.update(req.body);
  return { ...generalConstant.EN.ULTIMATE_DREAM.UPDATE_SUCCESS, data: record };
};

const remove = async (req) => {
  const record = await UltimateDream.findByPk(req.params.id);
  if (!record) {
    return { ...generalConstant.EN.ULTIMATE_DREAM.NOT_FOUND, data: null };
  }

  await record.destroy();
  return { ...generalConstant.EN.ULTIMATE_DREAM.DELETE_SUCCESS, data: null };
};

module.exports = { getActive, getForAdmin, create, update, remove };
