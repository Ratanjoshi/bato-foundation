const router = require("express").Router();
const formationController = require("../controllers/formation-controller");
const formationValidation = require("../../validations/formation-validation");

// GET /api/v1/formation
router.get("/", formationController.getFormationStory);

// PATCH /api/v1/formation
// ✅ Added json and update validations here
router.patch(
  "/",
  formationValidation.json, // Ensures content-type is JSON
  formationValidation.update, // Validates body
  formationController.updateFormationStory,
);

module.exports = router;
