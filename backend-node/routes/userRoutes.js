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
const upload = require("../middleware/userUploader");
const validate = require("../validations/complete-user-information.validation");

const router = express.Router();
router.get("/safeHouse", authenticateUser, safeHouse);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/cars", authenticateUser, getPersonalCars);
router.put("/profile", authenticateUser, updateUser);
router.patch(
  "/complete-information",
  authenticateUser,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "license", maxCount: 10 },
  ]),
  validate,
  completeInformation
);

module.exports = router;
