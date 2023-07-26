const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

//dbConnect
dbConnect();

//PORT
const PORT = process.env.PORT || 3000;
//server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
