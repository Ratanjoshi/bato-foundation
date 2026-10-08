const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/portfolio-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  portfolioPostValidation,
  portfolioPutValidation,
} = require("../../validations/portfolio-validation");

const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  authorization,
  portfolioPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  portfolioPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
