const Showroom = require("../models/showroom");
const ShowroomLocation = require("../models/ShowroomLocation");
const Joi = require("joi");

const showroomSchema = Joi.object({
  showroomName: Joi.string().required(),
  phoneNumber: Joi.string(),
  userID: Joi.string().required(),
});

const locationNameSchema = Joi.string().required();

const createShowroom = async (req, res) => {
  const { phoneNumber, showroomName, locations } = req.body;
  const { error, value } = showroomSchema.validate({
    showroomName,
    phoneNumber,
    userID: req.user._id,
  });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (!locations) {
    return res.status(400).json({ message: "invalid locations" });
  }

  try {
    const showroom = await Showroom.create(value);

    const { error: err, value: val } = Joi.array()
      .items(locationNameSchema)
      .validate(locations);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }

    const locs = val.map((locationName) => ({
      locationName,
      showroomId: showroom.id,
    }));

    const createdLocations = await ShowroomLocation.create(locs);

    res.status(201).json({
      message: "showroom created successfully",
      showroom,
      createdLocations,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getAllShowrooms = async (req, res) => {
  try {
    // const showrooms = await Showroom.find();
    // const locations = await ShowroomLocation.find()
    //   .populate("showroomId")
    //   .exec();
    // Showroom.find().then(async (showrooms) => {
    //   // console.log(showrooms);
    //   res.json(showrooms);

    //   // const r = await ShowroomLocation.populate(showrooms, {
    //   //   path: "locationId",
    //   // });
    //   // console.log(r);
    // });
    const showrooms = await Showroom.find();

    res.status(200).json({ message: "success", showrooms });
  } catch (error) {
    console.error("Error getting showrooms:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getShowroomById = async (req, res) => {};
const updateShowroom = async (req, res) => {};
const deleteShowroom = async (req, res) => {};

module.exports = {
  createShowroom,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
  getAllShowrooms,
};
