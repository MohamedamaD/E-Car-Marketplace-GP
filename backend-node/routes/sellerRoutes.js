const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller/sellerController");
const authenticateUser = require("../middleware/authenticateUser");
const carUploader = require("../middleware/carUploader");

router.get("/cars", authenticateUser, sellerController.getAllListedCars);
router.get("/cars/:carId", authenticateUser, sellerController.getCarDetails);
router.post(
  "/sell",
  authenticateUser,
  carUploader.array("car-images", 15),
  sellerController.sellCar
);
router.patch(
  "/update/:carId",
  authenticateUser,
  sellerController.updateCarDetails
);
router.delete("/remove/:carId", authenticateUser, sellerController.removeCar);

module.exports = router;
