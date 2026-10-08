const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/testimonial-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  testimonialPostValidation,
  testimonialPutValidation,
} = require("../../validations/testimonial-validation");

const {
  paginationValidation,
  idValidation,
  slugValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  authorization,
  testimonialPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  testimonialPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
