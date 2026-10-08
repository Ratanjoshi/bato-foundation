const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  update,
  list,
} = require("../controllers/blog-category-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");
const {
  blogCategoryPostValidation,
  blogCategoryPutValidation,
} = require("../../validations/blog-category-validation");

router.post(
  "/",
  authentication,
  authorization,
  blogCategoryPostValidation,
  create,
);
router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  blogCategoryPutValidation,
  update,
);

router.delete("/:id", idValidation, authentication, authorization, deleteOne);
module.exports = router;
