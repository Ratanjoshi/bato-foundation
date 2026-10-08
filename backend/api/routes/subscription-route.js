const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/subscription-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  subscriptionPostValidation,
  subscriptionPutValidation,
} = require("../../validations/subscription-validation");

const {
  paginationValidation,
  idValidation,
  slugValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  authorization,
  subscriptionPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  subscriptionPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
