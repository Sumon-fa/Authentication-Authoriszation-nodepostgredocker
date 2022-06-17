const express = require("express");
const router = express.Router();
const fileUpload = require("../middlewares/file-upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { newGame } = require("../controllers/gameController");

router
  .route("/admin/newgame")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    fileUpload.single("cover"),
    newGame
  );

module.exports = router;
