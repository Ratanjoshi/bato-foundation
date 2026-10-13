const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partnerController");

// Add your auth middleware here if you have one (e.g., router.use(authMiddleware))
// router.use(authMiddleware);

router
  .route("/")
  .get(partnerController.getPartners)
  .post(partnerController.createPartner);

router
  .route("/:id")
  .put(partnerController.updatePartner)
  .delete(partnerController.deletePartner);

module.exports = router;
