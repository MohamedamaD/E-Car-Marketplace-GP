const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  completeInformation,
  safeHouse,
  saveUser,
  changeAvatar,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");
const upload = require("../middleware/userUploader");
const avatarUploader = require("../middleware/avatarUploader");
const validate = require("../validations/complete-user-information.validation");

const router = express.Router();
router.get("/safeHouse", authenticateUser, safeHouse);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/saveUser", saveUser);

router.patch(
  "/avatar",
  authenticateUser,
  avatarUploader.single("avatar"),
  changeAvatar
);

router.patch(
  "/complete-information",
  authenticateUser,
  upload.array("license", 10),
  validate,
  completeInformation
);

router.put("/profile", authenticateUser, updateUser);

module.exports = router;
