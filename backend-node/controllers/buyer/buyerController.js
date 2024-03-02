const Car = require("../../models/Car");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCarDetails = async (req, res) => {
  try {
    const carId = req.params.carId;
    const { error, value } = idSchema.validate(carId);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }
    const car = await Car.findById(value);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car founded successfully", car });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const attachCar = async (req, res) => {};

module.exports = {
  getAllCars,
  getCarDetails,
  attachCar,
};
