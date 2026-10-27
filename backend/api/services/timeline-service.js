const { Timeline } = require("../../models");
const { Op } = require("sequelize");

class TimelineService {
  async getAll(query) {
    const { page = 1, limit = 10, search = "", isPublished } = query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { year: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (isPublished !== undefined && isPublished !== "") {
      whereClause.isPublished = isPublished === "true";
    }

    const { count, rows } = await Timeline.findAndCountAll({
      where: whereClause,
      order: [
        ["order", "ASC"],
        ["createdAt", "ASC"],
      ],
      limit: Number(limit),
      offset: Number(offset),
    });

    return {
      rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    };
  }

  async getById(id) {
    return await Timeline.findByPk(id);
  }

  async create(data) {
    if (data.order === undefined || data.order === null) {
      const maxOrder = await Timeline.max("order");
      data.order = maxOrder ? maxOrder + 1 : 1;
    }
    return await Timeline.create(data);
  }

  async update(id, data) {
    const timeline = await Timeline.findByPk(id);
    if (!timeline) return null;
    return await timeline.update(data);
  }

  async delete(id) {
    const timeline = await Timeline.findByPk(id);
    if (!timeline) return null;
    return await timeline.destroy();
  }

  async togglePublish(id, isPublished) {
    const timeline = await Timeline.findByPk(id);
    if (!timeline) return null;
    return await timeline.update({ isPublished });
  }
}

module.exports = new TimelineService();
