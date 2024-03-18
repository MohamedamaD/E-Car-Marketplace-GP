const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("email-validator");
const Car = require("../models/Car");
const generateToken = require("../utils/jwtUtils");
const Joi = require("joi");

const UpdateSchema = Joi.object({
  username: Joi.string().min(4).message("Please enter a valid username"),
  password: Joi.string().min(4).message("Please enter a valid password"),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .message("Please enter a valid phone number."),
});

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
    const user = await User.findById(req.user._id);

    const { error, value } = UpdateSchema.validate(req.body);

    if (error) {
      return res.status(409).json({ error: error.details[0].message });
    }

    if (user.password === value.password) {
      return res.status(409).json({ error: "Same password try another one" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(value.password, salt);

    user.username = value.username;
    user.phoneNumber = value.phoneNumber;

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
    const license = req.files;

    if (!license) {
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

const changeAvatar = async (req, res) => {
  try {
    const userID = req.user._id;
    const avatar = req.file;
    console.log(avatar);
    if (!avatar) {
      res.status(400).json({ error: "images is missing" });
    } else {
      const user = await User.findByIdAndUpdate(
        userID,
        {
          avatar: avatar.path,
        },
        { new: true }
      );
      const token = generateToken({ ...user });
      res.json({ message: "avatar update successfully", user, token });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  completeInformation,
  safeHouse,
  changeAvatar,
};
