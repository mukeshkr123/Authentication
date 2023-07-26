const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    minlength: [5, "Name must be at least 5 characters"],
    maxlength: [50, "Name must be less than 10 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: [true, "Email already registered"],
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  forgotPasswordToken: {
    type: String,
    select: false,
  },
  forgotPasswordExpiryDate: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
