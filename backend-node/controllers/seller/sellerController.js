const Car = require("../../models/Car");
const Joi = require("joi");

const idSchema = Joi.string().hex().length(24);
const carValidationSchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
  mileage: Joi.number(),
  color: Joi.string(),
  transmission: Joi.string(),
  description: Joi.string(),
  license: Joi.string(),
  features: Joi.array().items(Joi.string()).single(),
  owner: Joi.string().hex().length(24).required(),
});

const getAllListedCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const totalCars = await Car.countDocuments({ owner: req.user._id });
    const totalPages = Math.ceil(totalCars / pageSize);
    const skip = (page - 1) * pageSize;

    const cars = await Car.find({ owner: req.user._id })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ cars, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sellCar = async (req, res) => {
  const user = req.user;
  if (!req.files) {
    return res.status(400).json({ message: "images is missing" });
  }
  try {
    const { error, value } = carValidationSchema.validate({
      ...req.body,
      owner: user._id,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const images = req.files.map((img) => img.path);
    value.images = images;

    const car = await Car.create({
      ...value,
      address: `${user?.address?.street}, ${user?.address?.city}, ${user?.address?.country}`,
    });

    await car.save();

    res.status(201).json({ message: "car created successfully", car });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateCarDetails = async (req, res) => {
  const { carId } = req.params;
  const updateData = req.body;

  try {
    const car = await Car.findByIdAndUpdate(carId, updateData, { new: true });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const removeCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const { error, value } = idSchema.validate(carId);
    if (error) {
      return res.status(409).json({ error: "invalid id" });
    }

    await Car.findByIdAndDelete(value, { owner: req.user._id });
    res.status(204).end();
  } catch (error) {
    console.log(error);
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
    const car = await Car.findOne({ _id: value, owner: req.user._id });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car founded successfully", car });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllListedCars,
  sellCar,
  updateCarDetails,
  removeCar,
  getCarDetails,
};
