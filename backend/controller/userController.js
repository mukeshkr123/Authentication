const User = require("../model/userSchema");

// register the user
const registerUserCtrl = async (req, res) => {
  const { name, email, password, ConfirmPassword } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  registerUserCtrl,
};
