const router = require("express").Router();
const {
  authLogin,
  authLogout,
  authCreateUser,
  authUpdateUser,
  authDeleteUser,
  authGetUser,
  resetPassword,
  authChangePassword,
  authListUser,
  authGetProfile,
  authIsActiveUser,
  updateProfile,
  getTotalOfManyModel,
} = require("../controllers/auth-controller");
const {
  loginValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
  passwordValidation,
  updatePublicUserValidation,
} = require("../../validations/auth-validation");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  idValidation,
  paginationValidation,
} = require("../../validations/common-validation");

router.post("/create", authentication, createUserValidation, authCreateUser);

router.get("/profile", authentication, authGetProfile);
router.get("/getTotalOfManyModel", authentication, getTotalOfManyModel);
router.put(
  "/update-profile",
  authentication,
  updatePublicUserValidation,
  updateProfile,
);
router.get(
  "/list",
  authentication,
  authorization,
  paginationValidation,
  authListUser,
);

router.put(
  "/change-password",
  authentication,
  passwordValidation,
  authChangePassword,
);
router.put(
  "/reset-password/:id",
  authentication,
  authorization,
  idValidation,
  passwordValidation,
  resetPassword,
);

router.delete(
  "/:id",
  authentication,
  authorization,
  idValidation,
  deleteUserValidation,
  authDeleteUser,
);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  updateUserValidation,
  authUpdateUser,
);

router.patch("/:id", authentication, idValidation, authIsActiveUser);

router.get("/:id", authentication, authorization, idValidation, authGetUser);

router.post("/login", loginValidation, authLogin);
router.post("/logout", authentication, authLogout);

module.exports = router;
