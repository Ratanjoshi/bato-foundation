const router = require("express").Router();
const {
  create,
  deleteOne,
  getBySlug,
  getById,
  update,
  list,
} = require("../controllers/blog-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");

const {
  blogPostValidation,
  blogPutValidation,
} = require("../../validations/blog-validation");

router.post("/", authentication, authorization, blogPostValidation, create);
router.get("/list", paginationValidation, list);

router.get("/slug/:slug", getBySlug);
router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  blogPutValidation,
  update,
);

router.delete("/:id", idValidation, authentication, authorization, deleteOne);
module.exports = router;
