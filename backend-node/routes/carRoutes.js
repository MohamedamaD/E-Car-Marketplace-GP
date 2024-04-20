const express = require("express");
const {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
  getCars,
  bookCar,
} = require("../controllers/carController");
const authenticateUser = require("../middleware/authenticateUser");
const fetchCars = require("../services/dataCars");

const router = express.Router();

router.post("/", authenticateUser, createCar);
router.get("/:id", getCarById);
router.get("/", getCars);
router.patch("/:id", updateCar);
router.delete("/:id", deleteCar);

router.post("/:id/book", bookCar);

module.exports = router;
