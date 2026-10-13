const { Partner } = require("../../models");

exports.getAllPartners = async (isAdmin = false) => {
  const where = isAdmin ? {} : { isActive: true };
  return await Partner.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
};

exports.createPartner = async (data) => {
  return await Partner.create(data);
};

exports.updatePartner = async (id, data) => {
  const partner = await Partner.findByPk(id);
  if (!partner) return null;
  return await partner.update(data);
};

exports.deletePartner = async (id) => {
  const partner = await Partner.findByPk(id);
  if (!partner) return null;
  return await partner.destroy();
};
