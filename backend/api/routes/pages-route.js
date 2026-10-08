const router = require("express").Router();
const {
  create,
  getById,
  list,
  update,
  deletePage,
  getBySlug,
} = require("../controllers/pages-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const {
  pagesPostValidation,
  pagesPutValidation,
} = require("../../validations/pages-validation");
const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");

router.post("/", authentication, authorization, pagesPostValidation, create);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);
router.get("/page/:slug", getBySlug);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  pagesPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, deletePage);
module.exports = router;
