const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema({
  showroomName: { type: String },
  phoneNumber: { type: String },
  // to get created by who
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 
  locationsIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
});

const Showroom = mongoose.model("Showroom", showroomSchema);

module.exports = Showroom;
