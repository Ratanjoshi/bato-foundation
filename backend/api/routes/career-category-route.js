const router = require("express").Router();
const {
  create,
  getById,
  list,
  remove,
  update,
} = require("../controllers/career-category-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");

const {
  careerCategoryPostValidation,
  careerCategoryPutValidation,
} = require("../../validations/career-category-validation");

router.post(
  "/",
  authentication,
  authorization,
  careerCategoryPostValidation,
  create,
);
router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  careerCategoryPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, idValidation, remove);
module.exports = router;
