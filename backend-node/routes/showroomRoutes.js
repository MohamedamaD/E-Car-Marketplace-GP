const express = require("express");
const {
  createShowroom,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
  getAllShowrooms,
  updateShowroomImage,
  getUserShowrooms,
} = require("../controllers/showroomController");
const authenticateUser = require("../middleware/authenticateUser");
const showroomUploader = require("../middleware/showroomUploader");
const router = express.Router();

router.get("/user/", authenticateUser, getUserShowrooms);
router.get("/:id", getShowroomById);
router.get("/", getAllShowrooms);
router.post(
  "/",
  authenticateUser,
  showroomUploader.single("image"),
  createShowroom
);
router.patch("/:id", showroomUploader.single("image"), updateShowroom);
router.delete("/:id", deleteShowroom);
module.exports = router;
