const User = require("../models/User");
const Banner = require("../models/banner");

const createBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageURL = req.file.path;
    const userID = req.user._id;
    const banner = new Banner({ imageURL, userID });
    await banner.save();

    res.status(201).json({
      success: true,
      message: "upload banner successfully",
      imageURL,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const getBanners = (req, res) => {};

const getLatestBanners = async (req, res, next) => {
  try {
    const latestBanners = await Banner.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      banners: latestBanners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  createBanner,
  getBanners,
  getLatestBanners,
};
