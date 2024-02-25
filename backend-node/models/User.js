const mongoose = require("mongoose");
const showroomSchema = require("./showroom");

// @note for all -> basic user schema it will update later - for now just to test front end part
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["seller", "buyer", "showroom-owner", "admin"],
    default: "seller",
  },

  isNewUser: { type: Boolean, enum: [false, true], default: true }, // عشان  يكمل معلوماته  ف الفرونت
  phoneNumber: { type: String },
  licensePictures: [{ type: String }],

  lastModificationDate: { type: Date, default: Date.now },

  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
