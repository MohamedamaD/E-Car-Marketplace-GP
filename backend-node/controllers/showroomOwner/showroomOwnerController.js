const Showroom = require("../../models/showroom");
const ShowroomLocation = require("../../models/ShowroomLocation");
const Joi = require("joi");

const getShowrooms = async (req, res) => {
  try {
    const userID = req.user;

    const showrooms = await Showroom.find({ userID }).populate("locationsIDs");

    if (showrooms.length < 0) {
      res.status(409).json({ message: "empty showrooms", showrooms: [] });
    }

    res.json({ showrooms });
  } catch (error) {
    console.error("Error retrieving showrooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCarToShowroom = async (req, res) => {
  try {
    const { locationID, showroomID } = req.body;
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

module.exports = {
  getShowrooms,
  addCarToShowroom,
  updateCarShowroom,
  removeCarFromShowroom,
};
