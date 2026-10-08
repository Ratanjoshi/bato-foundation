const router = require("express").Router();
const {
  create,
  deleteNewsletter,
  getById,
  list,
} = require("../controllers/subscribers-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");
const {
  subscribersPostValidation,
} = require("../../validations/subscribers-validation");

router.post("/", subscribersPostValidation, create);
router.get("/list", authentication, authorization, paginationValidation, list);

router.get("/:id", idValidation, getById);

router.delete("/:id", authentication, authorization, deleteNewsletter);
module.exports = router;
