const router = require("express").Router();
const {
  create,
  getById,
  list,
  remove,
  update,
  listForAdmin,
  getBySlug,
} = require("../controllers/career-controller");
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
} = require("../../validations/career-category-validation");
const {
  careerPutValidation,
  careerPostValidation,
} = require("../../validations/career-validaion");

router.post("/", authentication, authorization, careerPostValidation, create);
router.get("/list", paginationValidation, list);

router.get(
  "/admin-list",
  authentication,
  authorization,
  paginationValidation,
  listForAdmin,
);

router.get("/:slug", getBySlug);

router.get(
  "/admin-get/:id",
  authentication,
  authorization,
  idValidation,
  getById,
);

router.put("/:id", authentication, authorization, careerPutValidation, update);

router.delete("/:id", authentication, authorization, idValidation, remove);
module.exports = router;
