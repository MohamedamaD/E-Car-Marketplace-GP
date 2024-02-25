const express = require("express");
const {
  createShowroom,
  getAllShowrooms,
} = require("../controllers/showroomController");

const router = express.Router();

router.post("/", createShowroom);
router.get("/", getAllShowrooms);

module.exports = router;
