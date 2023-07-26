const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRouter = require("./routes/userRoutes");
const app = express();

//dbConnect
dbConnect();

app.use(express.json());

// user routes
app.use("/api/users", userRouter);

//PORT
const PORT = process.env.PORT || 3000;
//server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
