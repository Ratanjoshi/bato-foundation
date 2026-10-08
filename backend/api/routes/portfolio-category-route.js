const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/portfolio-category-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  portfolioCategoryPostValidation,
  portfolioCategoryPutValidation,
} = require("../../validations/portfolio-category-validation");

const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  authorization,
  portfolioCategoryPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  portfolioCategoryPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
