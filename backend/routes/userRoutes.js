const express = require("express");
const { registerUserCtrl } = require("../controller/userController");
const userRouter = express.Router();

// Signup routes
userRouter.post("/register", registerUserCtrl);

module.exports = userRouter;
