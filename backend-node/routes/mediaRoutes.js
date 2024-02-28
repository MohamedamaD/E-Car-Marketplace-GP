const express = require("express");
const { createBanner, getBanners } = require("../controllers/mediaController");
const upload = require("../middleware/bannerUploader");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();
router.get("/banner", getBanners);
router.post("/banner", authenticateUser, upload.single("banner"), createBanner);

module.exports = router;
