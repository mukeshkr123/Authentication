const User = require("../model/userSchema");
const emailValidator = require("email-validator");

// register the user
const registerUserCtrl = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // check every field is required
  if (!name || !email || !password || !confirmPassword) {
    console.log("not");
  }

  // validate the email
  const validateEmail = emailValidator.validate(email);
  if (!validateEmail) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address ",
    });
  }

  try {
    // check password and confirm password matcches or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm Password does not match ❌",
      });
    }

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
        message: `Account already exist with the provided email ${email} `,
      });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUserCtrl,
};
