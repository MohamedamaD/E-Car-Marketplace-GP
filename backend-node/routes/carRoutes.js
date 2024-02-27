const express = require("express");
const {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/", authenticateUser, createCar);
router.get("/:id", getCarById);
router.patch("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
