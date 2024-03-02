const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyer/buyerController");

router.get("/cars", buyerController.getAllCars);
router.get("/cars/:carId", buyerController.getCarDetails);
router.post("/attach/:carId", buyerController.attachCar);

module.exports = router;
