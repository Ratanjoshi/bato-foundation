const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/technologies-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  technologiesPostValidation,
  technologiesPutValidation,
} = require("../../validations/technologies-validation");

const {
  paginationValidation,
  idValidation,
  slugValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  authorization,
  technologiesPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  technologiesPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, remove);

module.exports = router;
