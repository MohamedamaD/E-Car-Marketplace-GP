const User = require("../models/User");
const generateToken = require("../utils/jwtUtils");
const createBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { banners: filePath },
      },
      { new: true }
    );
    const token = generateToken({ ...user });
    res.status(201).json({
      success: true,
      message: "upload banner successfully",
      filePath,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const getBanners = (req, res) => {};
module.exports = {
  createBanner,
  getBanners,
};
