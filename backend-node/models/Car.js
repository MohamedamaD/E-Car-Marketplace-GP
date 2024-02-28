const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number },
  color: { type: String },
  transmission: { type: String },
  license: { type: String },
  images: [{ type: String }],
  showroomID: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom" },
  locationID: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
