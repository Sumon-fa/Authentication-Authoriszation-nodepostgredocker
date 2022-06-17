const express = require("express");
const { newProvider } = require("../controllers/providerController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const fileUpload = require("../middlewares/file-upload");

router
  .route("/admin/newprovider")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    fileUpload.single("logo"),
    newProvider
  );

module.exports = router;
