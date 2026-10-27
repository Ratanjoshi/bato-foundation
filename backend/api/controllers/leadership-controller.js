const { LeadershipMember } = require("../../models");
const { Op } = require("sequelize"); // ✅ Needed for search functionality

// GET /api/v1/leadership
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", published, admin } = req.query;

    let whereCondition = {};

    // 1. Handle Public vs Admin access
    if (admin === "true") {
      // Admin panel logic: filter by published if dropdown is selected
      if (published === "true") whereCondition.published = true;
      if (published === "false") whereCondition.published = false;
    } else {
      // Public site logic: force show only published
      whereCondition.published = true;
    }

    // 2. Handle Search (Name or Role)
    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { role: { [Op.like]: `%${search}%` } },
      ];
    }

    // 3. Handle Pagination
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await LeadershipMember.findAndCountAll({
      where: whereCondition,
      order: [
        ["order", "ASC"],
        ["createdAt", "ASC"],
      ],
      limit: Number(limit),
      offset: offset,
    });

    // 4. Return paginated response structure for the Admin Panel
    return res.status(200).json({
      success: true,
      data: {
        rows,
        total: count,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.error("[getAllLeadership Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/v1/leadership/:id
exports.getOne = async (req, res) => {
  try {
    const member = await LeadershipMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Leadership member not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error("[getOneLeadership Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// POST /api/v1/leadership
exports.create = async (req, res) => {
  try {
    const member = await LeadershipMember.create(req.body);

    return res.status(201).json({
      success: true,
      data: member,
      message: "Leadership member created successfully",
    });
  } catch (error) {
    console.error("[createLeadership Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// PATCH /api/v1/leadership/:id
exports.update = async (req, res) => {
  try {
    const member = await LeadershipMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Leadership member not found",
      });
    }

    await member.update(req.body);

    return res.status(200).json({
      success: true,
      data: member,
      message: "Leadership member updated successfully",
    });
  } catch (error) {
    console.error("[updateLeadership Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE /api/v1/leadership/:id
exports.delete = async (req, res) => {
  try {
    const member = await LeadershipMember.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Leadership member not found",
      });
    }

    await member.destroy();

    return res.status(200).json({
      success: true,
      message: "Leadership member deleted successfully",
    });
  } catch (error) {
    console.error("[deleteLeadership Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
