const express = require("express");
const { createBanner } = require("../controllers/mediaController");
const upload = require("../middleware/imageUploader");

const router = express.Router();
router.post("/banner", upload.single("banner"), createBanner);

module.exports = router;
