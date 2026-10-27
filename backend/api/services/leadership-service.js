// Go up TWO levels to reach backend/models
const { leadership_member } = require("../../models");
// Note: Check your backend/models/index.js. If your model was defined with
// a capital letter like 'LeadershipMember', change the destructure above to match.

class LeadershipService {
  async getAll(publishedOnly = true) {
    const where = publishedOnly ? { published: true } : {};
    return await leadership_member.findAll({
      where,
      order: [
        ["order", "ASC"],
        ["createdAt", "ASC"],
      ],
    });
  }

  async getById(id) {
    return await leadership_member.findByPk(id);
  }

  async create(data) {
    return await leadership_member.create(data);
  }

  async update(id, data) {
    const member = await leadership_member.findByPk(id);
    if (!member) return null;
    return await member.update(data);
  }

  async delete(id) {
    const member = await leadership_member.findByPk(id);
    if (!member) return null;
    await member.destroy();
    return true;
  }
}

module.exports = new LeadershipService();
