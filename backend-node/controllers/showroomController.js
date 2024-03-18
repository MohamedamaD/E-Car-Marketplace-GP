const Car = require("../models/Car");
const Showroom = require("../models/showroom");
const ShowroomLocation = require("../models/ShowroomLocation");
const Joi = require("joi");

const showroomSchema = Joi.object({
  showroomName: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string(),
  userID: Joi.string().required(),
});

const idSchema = Joi.string().hex().length(24);
const locationSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

const createShowroom = async (req, res) => {
  const { showroomName, locations, description } = req.body;
  const image = req.file;

  const { error, value } = showroomSchema.validate({
    showroomName,
    description,
    image: image.path,
    userID: req.user._id,
  });
  // console.log(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (!locations) {
    return res.status(400).json({ message: "invalid locations" });
  }

  const session = await Showroom.startSession();
  session.startTransaction();

  try {
    const showroom = await Showroom.create(value);
    const { error: err, value: val } = Joi.array()
      .items(locationSchema)
      .validate(locations);

    // console.log(locations);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }

    const locs = val.map((item) => ({
      ...item,
      showroomId: showroom.id,
    }));

    const createdLocations = await ShowroomLocation.create(locs);
    // console.log(locs);
    const updatedShowroom = await Showroom.findByIdAndUpdate(
      showroom.id,
      {
        $push: { locationsIDs: { $each: createdLocations } },
      },
      { new: true }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "showroom created successfully",
      showroom: updatedShowroom,
      locations: createdLocations,
    });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: e });
  }
};

const getAllShowrooms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const searchQuery = req.query.search || "";

    const query = {};
    if (searchQuery) {
      query.name = { $regex: new RegExp(searchQuery, "i") };
    }

    const totalShowrooms = await Showroom.countDocuments(query);
    const totalPages = Math.ceil(totalShowrooms / pageSize);

    const skip = (page - 1) * pageSize;

    const showrooms = await Showroom.find(query).skip(skip).limit(pageSize);

    res.status(200).json({ message: "success", showrooms, totalPages });
  } catch (error) {
    console.error("Error getting showrooms:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getShowroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const { error, value } = idSchema.validate(id);

    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }

    const showroom = await Showroom.findById(value);

    if (!showroom) {
      return res.status(409).json({ message: "Showroom not found" });
    }
    const cars = await Car.find({ showroomID: id });
    res.json({ message: "operation success", showroom, cars });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const updateShowroom = async (req, res) => {
  const { id } = req.params;
  const { phoneNumber, showroomName } = req.body;

  try {
    const updatedShowroom = await Showroom.findByIdAndUpdate(
      id,
      { phoneNumber, showroomName },
      { new: true }
    );
    res.json({
      message: "Showroom updated successfully",
      showroom: updatedShowroom,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
const deleteShowroom = async (req, res) => {
  try {
    const { id } = req.params;
    const showroom = await Showroom.findById(id);

    if (!showroom) {
      return res.status(409).json({ message: "Showroom not found" });
    }
    const locationIds = showroom.locationsIDs;

    await Showroom.findByIdAndDelete(id);

    await ShowroomLocation.deleteMany({ _id: { $in: locationIds } });

    res.json({
      message: "Showroom and associated locations deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserShowrooms = async (req, res) => {
  try {
    const userId = req.user;

    const showrooms = await Showroom.find({ userID: userId }).populate(
      "locationsIDs"
    );

    if (showrooms.length < 0) {
      res.status(409).json({ message: "empty showrooms", showrooms: [] });
    }

    res.json({ showrooms });
  } catch (error) {
    console.error("Error retrieving showrooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateShowroomImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file;
    console.log(image);
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
  createShowroom,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
  getAllShowrooms,
  getUserShowrooms,
  updateShowroomImage,
};
