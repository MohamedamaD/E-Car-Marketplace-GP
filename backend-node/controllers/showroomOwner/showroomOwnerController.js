const Showroom = require("../../models/showroom");
const ShowroomLocation = require("../../models/ShowroomLocation");
const showroomValidator = require("../../validations/showroom.validation");
const idValidator = require("../../validations/id.validation");
const carValidator = require("../../validations/car-validation");
const Car = require("../../models/Car");

const getShowrooms = async (req, res) => {
  try {
    const userID = req.user;

    if (parseInt(req.query.total)) {
      const showrooms = await Showroom.find({ userID });

      res.json({ showrooms });
    } else {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 12;
      const totalShowrooms = await Showroom.countDocuments({ userID });
      const totalPages = Math.ceil(totalShowrooms / pageSize);
      const skip = (page - 1) * pageSize;

      const showrooms = await Showroom.find({ userID })
        .skip(skip)
        .limit(pageSize);

      if (showrooms.length < 0) {
        res.status(409).json({ message: "empty showrooms", showrooms: [] });
      }

      res.json({ showrooms, totalPages });
    }
  } catch (error) {
    console.error("Error retrieving showrooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCarToShowroom = async (req, res) => {
  try {
    const { error, value } = carValidator.validate({
      ...req.body,
      owner: req.user._id,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const images = req.files.map((img) => img.path);
    value.images = images;
    
    const car = new Car(value);
    await car.save();

    res.status(201).json({ message: "car created successfully", Car });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCarShowroom = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const removeCarFromShowroom = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeShowroom = async (req, res) => {
  try {
    const { id } = req.params;
    const showroom = await Showroom.findById(id);

    if (!showroom) {
      return res.status(409).json({ message: "Showroom not found" });
    }

    await Showroom.findByIdAndDelete(id);

    res.json({
      message: "Showroom and associated locations deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateShowrooms = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedShowroom = await Showroom.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );
    res.json({
      message: "Showroom updated successfully",
      showroom: updatedShowroom,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const createShowroom = async (req, res) => {
  const { name, locations, description } = req.body;
  const image = req.file;

  const { error, value } = showroomValidator.validate({
    name,
    description,
    locations,
    image: image.path,
    userID: req.user._id,
  });
  // console.log(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const showroom = await Showroom.create(value);

    res.status(201).json({
      message: "showroom created successfully",
      showroom,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getShowroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const { error, value } = idValidator.validate(id);

    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }

    const showroom = await Showroom.findById(value);

    if (!showroom) {
      return res.status(409).json({ message: "Showroom not found" });
    }

    res.json({ message: "operation success", showroom });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateShowroomImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file;

    const showroom = await Showroom.findByIdAndUpdate(
      id,
      { image: image.path },
      { new: true }
    );

    res.json({ message: "updated", showroom });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getShowrooms,
  getShowroomById,
  createShowroom,
  updateShowrooms,
  updateShowroomImage,
  addCarToShowroom,
  updateCarShowroom,
  removeCarFromShowroom,
  removeShowroom,
};
