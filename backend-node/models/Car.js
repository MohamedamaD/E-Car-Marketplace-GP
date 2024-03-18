const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number },
  color: { type: String },
  transmission: { type: String },
  description: { type: String },
  license: { type: String },
  images: [{ type: String }],
  features: [{ type: String }],
  showroomID: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // locationID: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
