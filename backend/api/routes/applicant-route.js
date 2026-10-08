const router = require("express").Router();
const {
  applyCareer,
  getById,
  list,
  remove,
  updateStatus,
} = require("../controllers/applicant-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  paginationValidation,
  idValidation,
} = require("../../validations/common-validation");
const {
  applicantPutValidation,
  applicantPostValidation,
} = require("../../validations/applicant-validation");

// public route
router.post("/", applyCareer);

// admin route

router.get("/list", authentication, authorization, paginationValidation, list);

router.get("/:id", authentication, authorization, idValidation, getById);

// router.put("/:id", update);
router.patch(
  "/:id",
  authentication,
  authorization,
  idValidation,
  applicantPutValidation,
  updateStatus,
);

router.delete("/:id", authentication, authorization, idValidation, remove);
module.exports = router;
