const router = require("express").Router();
const leadershipController = require("../controllers/leadership-controller");
// Two levels up to reach backend/validations
const leadershipValidation = require("../../validations/leadership-validation");

// GET /api/v1/leadership (Public)
router.get("/", leadershipController.getAll);

// GET /api/v1/leadership/:id (Public)
router.get("/:id", leadershipController.getOne);

// POST /api/v1/leadership (Admin)
router.post(
  "/",
  leadershipValidation.json, // Ensures content-type is JSON
  leadershipValidation.create, // Validates body
  leadershipController.create,
);

// PATCH /api/v1/leadership/:id (Admin)
router.patch(
  "/:id",
  leadershipValidation.json,
  leadershipValidation.update,
  leadershipController.update,
);

// DELETE /api/v1/leadership/:id (Admin)
// No validation needed here since we just need the ID from the URL params
router.delete("/:id", leadershipController.delete);

module.exports = router;
