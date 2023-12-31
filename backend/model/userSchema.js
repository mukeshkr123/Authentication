const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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

// Hash the password before saving
userSchema.pre("save", async function (next) {
  // If the password is not modified or changed, then do not hash it
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  //method for generating the jwt token
  jwtToken() {
    return JWT.sign(
      { id: this._id, email: this.email },
      "MY_SECRET_KEY",
      { expiresIn: "24h" } // 24 hours
    );
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
