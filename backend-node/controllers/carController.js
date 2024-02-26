const Car = require("../models/Car");

const createCar = async (req, res) => {
  const user = req.user;
  try {
    const car = await Car.create({ ...req.body, owner: user?._id });
    res.status(201).json({ message: "Car created successfully", car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json({ message: "Car founded successfully", car });
  } catch (error) {
    return res.status(500).json({ message: "invalid id" });
  }
};

const updateCar = async (req, res) => {
  try {
    console.log(req.body);
    const car = await Car.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "invalid id" });
  }
};
const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "invalid id can not delete" });
  }
};

module.exports = { createCar, getCarById, updateCar, deleteCar };
