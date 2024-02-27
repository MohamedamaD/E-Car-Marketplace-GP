const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  completeInformation,
  safeHouse,
  getPersonalCars,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");
const upload = require("../middleware/imageUploader");

const router = express.Router();
router.get("/safeHouse", authenticateUser, safeHouse);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/cars", authenticateUser, getPersonalCars);
router.put("/profile", authenticateUser, updateUser);
router.put(
  "/complete-information",
  authenticateUser,
  // upload.array("images", 10),
  completeInformation
);

module.exports = router;
