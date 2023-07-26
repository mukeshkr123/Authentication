const express = require("express");
const {
  registerUserCtrl,
  loginUserCtrl,
} = require("../controller/userController");
const userRouter = express.Router();

// Signup routes
userRouter.post("/register", registerUserCtrl);
userRouter.post("/login", loginUserCtrl);

module.exports = userRouter;
