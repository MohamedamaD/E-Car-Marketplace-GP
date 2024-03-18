const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  showroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom" },
  carID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

const ShowroomLocation = mongoose.model("Location", LocationSchema);

module.exports = ShowroomLocation;
