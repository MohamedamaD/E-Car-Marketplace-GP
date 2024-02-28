const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("email-validator");
const Car = require("../models/Car");
const generateToken = require("../utils/jwtUtils");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const isValid = validator.validate(email);
    if (!isValid) {
      return res.status(409).json({
        message:
          "The provided email address is not valid. Please enter a valid email address.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "The email address is already in use. Please use a different email address.",
      });
    }
    if (!password) {
      return res.status(409).json({
        message:
          "The provided password is not valid or empty. Please enter a valid password.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign({ ...newUser }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken: token,
      user: newUser,

      // user: { email, username, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      accessToken: token,
      user,
      message: "Login successful",
      // user: {
      //   email: user.email,
      //   name: user.username,
      //   role: user.role,
      // },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, newPassword, phoneNumber } = req.body;

    const user = await User.findById(req.user._id);

    if (user.password === newPassword) {
      return res.status(409).json({ message: "Same password try another one" });
    }
    if (!username) {
      return res.status(409).json({ message: "Invalid username" });
    }

    if (username) {
      user.username = username;
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (!phoneNumber) {
      return res.status(409).json({ message: "Invalid phoneNumber" });
    }
    user.phoneNumber = phoneNumber;

    await user.save();

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user,
      accessToken: token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const completeInformation = async (req, res) => {
  try {
    const { phoneNumber, street, city, country, role } = req.body;
    const address = { street, city, country };
    const avatar = req.files.avatar[0];
    const license = req.files.license;

    if (!avatar || !license) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        phoneNumber,
        address,
        role,
        lastModificationDate: new Date(),
        isNewUser: false,
        avatar: avatar.path,
        $push: { licensePictures: license.map((img) => img.path) },
      },
      { new: true }
    );
    await updatedUser.save();

    const token = generateToken({ ...updatedUser });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success: true,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const safeHouse = async (req, res) => {
  res
    .status(200)
    .json({ message: "token is valid and user is authorized", user: req.user });
};

const getPersonalCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  completeInformation,
  getPersonalCars,
  safeHouse,
};
