const express = require("express");
const {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
  getCars,
  bookCar,
  searchCarsByFields,
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
router.get("/searchByFields/q", searchCarsByFields);

module.exports = router;
