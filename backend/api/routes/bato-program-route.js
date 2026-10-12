"use strict";

const router = require("express").Router();
const controller = require("../controllers/bato-program-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const validation = require("../../validations/bato-program-validation");

router.get("/list", validation.list, controller.listPublic);
router.get(
  "/slug/:slug",
  validation.validateSlug,
  controller.getPublishedBySlug,
);
router.get(
  "/admin/list",
  authentication,
  authorization,
  validation.list,
  controller.listAdmin,
);
router.post(
  "/",
  authentication,
  authorization,
  validation.json,
  validation.create,
  controller.create,
);
router.get(
  "/:id",
  authentication,
  authorization,
  validation.validateId,
  controller.getById,
);
router.put(
  "/:id",
  authentication,
  authorization,
  validation.json,
  validation.validateId,
  validation.update,
  controller.update,
);
router.patch(
  "/:id",
  authentication,
  authorization,
  validation.json,
  validation.validateId,
  validation.publish,
  controller.publish,
);
router.delete(
  "/:id",
  authentication,
  authorization,
  validation.validateId,
  controller.remove,
);

module.exports = router;
