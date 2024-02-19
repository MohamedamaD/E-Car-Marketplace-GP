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

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      accessToken: token,
      user: { email, username, role: newUser.role },
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

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      accessToken: token,
      user: {
        email: user.email,
        name: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
