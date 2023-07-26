const User = require("../model/userSchema");

// register the user
const registerUserCtrl = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // check every field is required
  if (!name || !email || !password || !confirmPassword) {
    console.log("not");
  }

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
