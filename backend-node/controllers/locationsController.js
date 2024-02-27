const Joi = require("joi");
const ShowroomLocation = require("../models/ShowroomLocation");
const Car = require("../models/Car");

const idSchema = Joi.string().hex().length(24);

const getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = idSchema.validate(id);
    if (error) {
      return res.status(409).json({ message: "invalid id" });
    }
    const location = await ShowroomLocation.findById(value).populate("carID");
    if (!location) {
      res.status(409).json({ message: "location not found" });
    }
    res.status(200).json({ location });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { getLocationById };
