const {
  besidesProgramModel: BesidesProgram,
  Sequelize,
} = require("../../models");
const { Op } = require("sequelize");

/* =========================================================
   PUBLIC API
   ========================================================= */

// GET /api/v1/besides-programs
exports.getPublicBesidesPrograms = async (req, res, next) => {
  try {
    const items = await BesidesProgram.findAll({
      where: { isPublished: true },
      order: [
        ["order", "ASC"],
        ["id", "ASC"],
      ],
      attributes: ["id", "icon", "title", "description", "order"],
    });

    return res.status(200).json({
      title: "Success",
      message: "Besides programs fetched successfully",
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   ADMIN API
   ========================================================= */

// POST /api/v1/admin/besides-programs/create
exports.createBesidesProgram = async (req, res, next) => {
  try {
    const { icon, title, description, order, isPublished } = req.body;

    const existing = await BesidesProgram.findOne({ where: { title } });
    if (existing) {
      return res.status(409).json({
        title: "Conflict",
        message: "An item with this title already exists",
        data: [],
      });
    }

    const item = await BesidesProgram.create({
      icon,
      title,
      description,
      order: order ?? 0,
      isPublished: isPublished ?? true,
    });

    return res.status(201).json({
      title: "Success",
      message: "Besides program created successfully",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/admin/besides-programs/:id
exports.updateBesidesProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await BesidesProgram.findByPk(id);

    if (!item) {
      return res.status(404).json({
        title: "Not Found",
        message: "Besides program not found",
        data: [],
      });
    }

    if (req.body.title && req.body.title !== item.title) {
      const dup = await BesidesProgram.findOne({
        where: { title: req.body.title },
      });
      if (dup) {
        return res.status(409).json({
          title: "Conflict",
          message: "An item with this title already exists",
          data: [],
        });
      }
    }

    await item.update(req.body);

    return res.status(200).json({
      title: "Success",
      message: "Besides program updated successfully",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/admin/besides-programs/:id
exports.deleteBesidesProgram = async (req, res, next) => {
  try {
    const deleted = await BesidesProgram.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        title: "Not Found",
        message: "Besides program not found",
        data: [],
      });
    }

    return res.status(200).json({
      title: "Success",
      message: "Besides program deleted successfully",
      data: [],
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/admin/besides-programs/:id
exports.getBesidesProgram = async (req, res, next) => {
  try {
    const item = await BesidesProgram.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        title: "Not Found",
        message: "Besides program not found",
        data: [],
      });
    }

    return res.status(200).json({
      title: "Success",
      message: "OK",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/admin/besides-programs/list
exports.listBesidesProgram = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (req.query.isPublished !== undefined) {
      where.isPublished = req.query.isPublished === "true";
    }

    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${req.query.search}%` } },
        { description: { [Op.like]: `%${req.query.search}%` } },
      ];
    }

    const { rows, count } = await BesidesProgram.findAndCountAll({
      where,
      limit,
      offset,
      order: [
        ["order", "ASC"],
        ["id", "ASC"],
      ],
    });

    return res.status(200).json({
      title: "Success",
      message: "Besides programs fetched successfully",
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/admin/besides-programs/toggle-publish/:id
exports.togglePublishBesidesProgram = async (req, res, next) => {
  try {
    const item = await BesidesProgram.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        title: "Not Found",
        message: "Besides program not found",
        data: [],
      });
    }

    await item.update({ isPublished: !item.isPublished });

    return res.status(200).json({
      title: "Success",
      message: `Item ${item.isPublished ? "published" : "unpublished"} successfully`,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/admin/besides-programs/reorder
exports.reorderBesidesProgram = async (req, res, next) => {
  const t = await Sequelize.transaction();

  try {
    const { items } = req.body;

    // Fetch valid IDs first
    const ids = items.map((it) => it.id);
    const existing = await BesidesProgram.findAll({
      where: { id: { [Op.in]: ids } },
      attributes: ["id"],
      transaction: t,
    });
    const existingIds = new Set(existing.map((e) => e.id));

    const invalid = ids.filter((id) => !existingIds.has(id));
    if (invalid.length) {
      await t.rollback();
      return res.status(400).json({
        title: "Bad Request",
        message: `Invalid item IDs: ${invalid.join(", ")}`,
        data: [],
      });
    }

    await Promise.all(
      items.map((it) =>
        BesidesProgram.update(
          { order: it.order },
          { where: { id: it.id }, transaction: t },
        ),
      ),
    );

    await t.commit();

    const all = await BesidesProgram.findAll({
      order: [
        ["order", "ASC"],
        ["id", "ASC"],
      ],
    });

    return res.status(200).json({
      title: "Success",
      message: "Reordered successfully",
      data: all,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
