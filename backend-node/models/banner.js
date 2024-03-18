const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
