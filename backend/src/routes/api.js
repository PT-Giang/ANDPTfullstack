const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth");
const { getPrivate, getPublic } = require("../controller/apiController");
const checkRole = require("../middlewares/role");

// public
router.get("/public", getPublic);

// protected
router.get("/", verifyToken, getPrivate);

// Admin (chỉ admin mới vào được)
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({
    message: "Admin API",
    user: req.user.preferred_username,
  });
});

module.exports = router;
