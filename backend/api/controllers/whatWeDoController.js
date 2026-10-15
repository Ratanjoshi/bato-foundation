// backend/api/controllers/whatWeDoController.js
const service = require("../services/whatWeDoService"); // ✅ correct

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.list = asyncHandler(async (req, res) => {
  const data = await service.list(req.query);
  res.json({ success: true, ...data });
});

exports.listPublic = asyncHandler(async (req, res) => {
  const items = await service.listPublic();
  res.json({ success: true, items });
});

exports.getOne = asyncHandler(async (req, res) => {
  const item = await service.getById(req.params.id);
  res.json({ success: true, item });
});

exports.create = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) payload.image = `/uploads/what-we-do/${req.file.filename}`;
  const item = await service.create(payload);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) payload.image = `/uploads/what-we-do/${req.file.filename}`;
  const item = await service.update(req.params.id, payload);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  const result = await service.remove(req.params.id);
  res.json({ success: true, ...result });
});

exports.reorder = asyncHandler(async (req, res) => {
  const items = await service.reorder(req.body.orderedIds);
  res.json({ success: true, items });
});
