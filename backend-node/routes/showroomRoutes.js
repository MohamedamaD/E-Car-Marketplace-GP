const express = require("express");
const {
  createShowroom,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
  getAllShowrooms,
  getUserShowrooms,
} = require("../controllers/showroomController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/", authenticateUser, createShowroom);
router.get("/user/", authenticateUser, getUserShowrooms);
router.get("/:id", getShowroomById);
router.get("/", getAllShowrooms);
router.patch("/:id", updateShowroom);
router.delete("/:id", deleteShowroom);

module.exports = router;
