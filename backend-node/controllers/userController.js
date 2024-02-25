const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("email-validator");

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
      message: "Login successful"
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

    res.status(200).json({ message: "User updated successfully", success: true});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const completeInformation = async (req, res) => {
  try {
    const { phoneNumber, address, role } = req.body;

    if (!phoneNumber || !address) {
      //|| !images
      return res
        .status(401)
        .json({ message: "Missing Data Please Enter Missing Data" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        phoneNumber,
        address,
        role,
        // licensePictures: images,
        lastModificationDate: new Date(),
        isNewUser: false,
      }
    );
    await updatedUser.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success: true,
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

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  completeInformation,
  safeHouse,
};
