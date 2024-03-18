const express = require("express");
const router = express.Router();
const showroomOwnerController = require("../controllers/showroomOwner/showroomOwnerController");
const showroomUploader = require("../middleware/showroomUploader");
const authenticateUser = require("../middleware/authenticateUser");
const carUploader = require("../middleware/carUploader");

router.get(
  "/showrooms",
  authenticateUser,
  showroomOwnerController.getShowrooms
);

router.get(
  "/showrooms/:id",
  authenticateUser,
  showroomOwnerController.getShowroomById
);

router.post(
  "/showrooms",
  authenticateUser,
  showroomUploader.single("image"),
  showroomOwnerController.createShowroom
);

router.put(
  "/showrooms/:id",
  authenticateUser,
  showroomOwnerController.updateShowrooms
);

router.put(
  "/showrooms/:id/image",
  authenticateUser,
  showroomUploader.single("image"),
  showroomOwnerController.updateShowroomImage
);

router.delete("/showroom/:id", showroomOwnerController.removeShowroom);

router.post(
  "/add-car",
  authenticateUser,
  carUploader.array("car-images", 15),
  showroomOwnerController.addCarToShowroom
);

router.put("/update/:carId", showroomOwnerController.updateCarShowroom);
router.delete("/remove/:carId", showroomOwnerController.removeCarFromShowroom);

module.exports = router;
