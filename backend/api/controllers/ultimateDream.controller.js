const service = require("../services/ultimateDream.service");
const {
  createUltimateDreamSchema,
  updateUltimateDreamSchema,
} = require("../../validations/ultimateDream.validation");

/* ───────── GET /api/v1/ultimate-dream ───────── */
exports.getActive = async (req, res) => {
  try {
    const data = await service.getActiveUltimateDream();
    res.json({ success: true, data });
  } catch (err) {
    console.error("getActive:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ───────── GET /api/v1/ultimate-dream/admin ───────── */
exports.getForAdmin = async (req, res) => {
  try {
    const data = await service.getUltimateDreamForAdmin();
    res.json({ success: true, data });
  } catch (err) {
    console.error("getForAdmin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ───────── POST /api/v1/ultimate-dream ───────── */
exports.create = async (req, res) => {
  try {
    const { error, value } = createUltimateDreamSchema.validate(req.body, {
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      return res
        .status(422)
        .json({ success: false, message: error.details[0].message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const data = await service.createUltimateDream(value, req.file);
    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("create:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ───────── PUT /api/v1/ultimate-dream/:id ───────── */
exports.update = async (req, res) => {
  try {
    // Idempotent: if no id in DB, we auto-create (frontend may not know id)
    const { error, value } = updateUltimateDreamSchema.validate(req.body, {
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      return res
        .status(422)
        .json({ success: false, message: error.details[0].message });
    }

    const data = await service.updateUltimateDream(
      req.params.id,
      value,
      req.file,
    );

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error("update:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ───────── DELETE /api/v1/ultimate-dream/:id ───────── */
exports.remove = async (req, res) => {
  try {
    const ok = await service.deleteUltimateDream(req.params.id);
    if (!ok) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("remove:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
