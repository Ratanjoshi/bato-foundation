const router = require("express").Router();

const {
  create,
  getBySlug,
  list,
  update,
  remove,
} = require("../controllers/service-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  servicePostValidation,
  servicePutValidation,
} = require("../../validations/service-validation");

const {
  paginationValidation,
  idValidation,
  slugValidation,
} = require("../../validations/common-validation");

router.post("/", authentication, authorization, servicePostValidation, create);

router.get("/list", paginationValidation, list);

router.get("/:slug", slugValidation, getBySlug);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  servicePutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
