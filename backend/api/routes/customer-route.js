require("../../helpers/oauth/google-oauth-helper");
require("../../helpers/oauth/local-oauth-helper");

const router = require("express").Router();
const passport = require("passport");
const {
  register,
  profile,
  verify,
  logout,
  login,
  oAuthLogin,
  regenerateToken,
  forgetPassword,
  generateFPToken,
  verifyFPToken,
  update,
  changePassword,
  createGuestAcc,
  updateGuestAcc,
} = require("../controllers/customer-controller");

const authenticateUser = require("../../middlewares/customer-auth-middleware");
const {
  loginValidation,
  registerValidation,
  verifyEmailValidation,
  regenerateTokenValidation,
  changePasswordValidation,
  forgetPasswordValidation,
  updateValidation,
} = require("../../validations/customer-validation");

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/v1/customer/oauth-login",
    failureRedirect: "/api/v1/customer/failure",
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/v1/customer/oauth-login",
    failureRedirect: "/api/v1/customer/failure",
    scope: "email",
  }),
);

router.get(
  "/apple/callback",
  passport.authenticate("apple", {
    successRedirect: "/api/v1/customer/oauth-login",
    failureRedirect: "/api/v1/customer/failure",
  }),
);
router.post(
  "/login",
  loginValidation,
  passport.authenticate("local", {
    successRedirect: "/api/v1/customer/local-login",
    failureRedirect: "/api/v1/customer/failure",
    failureMessage: true,
  }),
);

router.post("/register", registerValidation, register);
router.patch("/verify", verifyEmailValidation, verify);
router.post("/regenerate-otp", regenerateTokenValidation, regenerateToken);
router.post("/update-profile", authenticateUser, updateValidation, update);

// testing needed
router.post("/create-guest", createGuestAcc);

router.put("/update-guest", updateValidation, updateGuestAcc);
// testing till here

router.get("/me", authenticateUser, profile);
router.get("/failure", (req, res) => {
  const message = req.session.messages?.pop() || "Login failed";
  res.status(401).json({ success: false, message });
});

router.get("/local-login", login);
router.get("/oauth-login", oAuthLogin);

router.patch(
  "/change-password",
  authenticateUser,
  changePasswordValidation,
  changePassword,
);
router.patch("/generate-fp-token", regenerateTokenValidation, generateFPToken);
router.patch("/verify-fp-token", verifyEmailValidation, verifyFPToken);
router.patch("/forget-password", forgetPasswordValidation, forgetPassword);
router.patch("/logout", authenticateUser, logout);

module.exports = router;
