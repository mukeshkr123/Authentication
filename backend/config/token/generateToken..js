// function to generate the token
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, MY_SECRET_KEY, { expiresIn: "24h" });
};

module.exports = generateToken;
