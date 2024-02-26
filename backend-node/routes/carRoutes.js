const express = require("express");
const {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const authenticateUser = require("../middleware/authenticateUser");
const validateRole = require("../middleware/validateRole");

const router = express.Router();

router.post("/", authenticateUser, validateRole, createCar);
router.get("/:id", getCarById);
router.patch("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
