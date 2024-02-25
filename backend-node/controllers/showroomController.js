const Showroom = require("../models/showroom");

const createShowroom = async (req, res) => {
  try {
    const { showroomName, location, phoneNumber, userID } = req.body;
    const showroom = new Showroom({
      showroomName,
      location,
      phoneNumber,
      userID,
    });
    await showroom.save();
    res.status(201).json(showroom);
  } catch (error) {
    console.error("Error creating showroom:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllShowrooms = async (req, res) => {
  try {
    const showrooms = await Showroom.find();
    res.status(200).json(showrooms);
  } catch (error) {
    console.error("Error getting showrooms:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createShowroom,
  getAllShowrooms,
};
