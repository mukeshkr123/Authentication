const User = require("../model/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// Register the user
const registerUserCtrl = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validate the email format
  const isEmailValid = emailValidator.validate(email);
  if (!isEmailValid) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match",
    });
  }

  try {
    // Create the user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `An account already exists with the provided email ${email}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to register the user",
    });
  }
};

// Login user
const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find the user by email
    const userFound = await User.findOne({ email }).select("+password");

    if (userFound && (await bcrypt.compare(password, userFound.password))) {
      return res.json(userFound);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to log in",
    });
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
};
