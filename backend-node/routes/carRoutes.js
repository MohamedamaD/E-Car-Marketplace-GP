const express = require("express");
const {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
  getCars,
} = require("../controllers/carController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/", authenticateUser, createCar);
router.get("/:id", getCarById);
router.get("/", getCars);
router.patch("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
