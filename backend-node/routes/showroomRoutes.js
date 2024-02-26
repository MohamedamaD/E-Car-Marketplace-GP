const express = require("express");
const {
  createShowroom,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
  getAllShowrooms,
} = require("../controllers/showroomController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/", authenticateUser, createShowroom);
router.get("/:id", getShowroomById);
router.get("/", getAllShowrooms);
router.put("/:id", updateShowroom);
router.delete("/:id", deleteShowroom);

module.exports = router;
