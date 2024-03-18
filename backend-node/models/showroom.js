const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  locations: [{ name: String, phone: String, address: String }],

  // to get created by who
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // locationsIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
});

const Showroom = mongoose.model("Showroom", showroomSchema);

module.exports = Showroom;
