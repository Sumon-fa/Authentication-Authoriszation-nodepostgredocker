const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  getUsers,
  logout,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router
  .route("/admin/allusers")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
