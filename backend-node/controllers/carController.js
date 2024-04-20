const Car = require("../models/Car");
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
  license: Joi.string(),
  // images: Joi.array().items(
  //   Joi.binary()
  //     .encoding("base64")
  //     .min(1)
  //     .max(10 * 1024 * 1024)
  // ),
  owner: Joi.string().hex().length(24).required(),
  showroomID: Joi.string().hex().length(24),
  locationID: Joi.string().hex().length(24),
});

const createCar = async (req, res) => {
  const user = req.user;

  try {
    const { error, value } = carValidationSchema.validate({
      ...req.body,
      owner: user._id,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (user.role === "seller") {
      const car = await Car.create({
        ...value,
        showroomID: null,
        locationID: null,
      });
      res.status(201).json({ message: "car created successfully", car });
    } else if (user.role === "showroom-owner") {
      const car = await Car.create(value);
      res.status(201).json({ message: "car created successfully", car });
    } else {
      return res.status(500).json({ message: "invalid user role" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = idSchema.validate(id);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }
    const car = await Car.findById(value);
    res.status(200).json({ message: "Car founded successfully", car });
  } catch (error) {
    return res.status(500).json({ message: "invalid id" });
  }
};

const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = idSchema.validate(id);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }
    const { make, model, year, mileage, color, transmission, license, images } =
      req.body;
    const car = await Car.findByIdAndUpdate(
      value,
      { make, model, year, mileage, color, transmission, license, images },
      { new: true }
    );
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    return res.status(500).json({ message: "invalid id" });
  }
};
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = idSchema.validate(id);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }

    await Car.findByIdAndDelete(value);
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "invalid id can not delete" });
  }
};

const bookCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error, value } = idSchema.validate(id);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      value,
      { booked: req.body.value },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res
      .status(200)
      .json({ message: "Car booked successfully", car: updatedCar });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCars = async (req, res, next) => {
  try {
    const { make, transmission, minPrice, maxPrice, sortBy, page, pageSize } =
      req.query;

    const filter = {};
    if (make) filter.make = make;
    if (transmission) filter.transmission = transmission;
    if (minPrice !== 0 || maxPrice !== 0) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    const sortOptions = {};
    if (sortBy) {
      switch (sortBy) {
        case "lowToHigh":
          sortOptions.price = 1;
          break;
        case "highToLow":
          sortOptions.price = -1;
          break;
        case "oldToNew":
          sortOptions.year = 1;
          break;
        case "newToOld":
          sortOptions.year = -1;
          break;
        case "mileageLowToHigh":
          sortOptions.mileage = 1;
          break;
        case "mileageHighToLow":
          sortOptions.mileage = -1;
          break;
        default:
          break;
      }
    }

    const currentPage = parseInt(page) || 1;
    const ps = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * ps;

    const cars = await Car.find(filter).sort(sortOptions).skip(skip).limit(ps);
    console.log(filter, sortOptions);
    const totalCarsCount = await Car.countDocuments(filter);

    res.status(200).json({ success: true, cars, totalCarsCount });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  createCar,
  getCarById,
  updateCar,
  deleteCar,
  getCars,
  bookCar,
};
