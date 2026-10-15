const router = require("express").Router();
const {
  create,
  deleteById,
  getById,
  list,
  listPublic,
  reorder,
  update,
} = require("../controllers/what-we-do-controller");
const {
  whatWeDoPostValidation,
  whatWeDoPutValidation,
  whatWeDoReorderValidation,
} = require("../../validations/what-we-do-validation");
const { idValidation } = require("../../validations/common-validation");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

router.get("/public", listPublic);
router.get("/", authentication, list);
router.post(
  "/reorder",
  authentication,
  authorization,
  whatWeDoReorderValidation,
  reorder,
);
router.post("/", authentication, authorization, whatWeDoPostValidation, create);
router.get("/:id", authentication, authorization, idValidation, getById);
router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  whatWeDoPutValidation,
  update,
);
router.patch(
  "/:id",
  authentication,
  authorization,
  idValidation,
  whatWeDoPutValidation,
  update,
);
router.delete("/:id", authentication, authorization, idValidation, deleteById);

module.exports = router;
