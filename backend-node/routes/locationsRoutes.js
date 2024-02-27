const express = require("express");
const { getLocationById } = require("../controllers/locationsController");
const router = express.Router();
router.get("/:id", getLocationById);
module.exports = router;
