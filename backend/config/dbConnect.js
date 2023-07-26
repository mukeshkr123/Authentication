const mongoose = require("mongoose");
const MONGO_URL = `mongodb+srv://mukeshkr1234:mukeshkr1234@twitterclonecluster.qdlcm9w.mongodb.net/AuthUser?retryWrites=true&w=majority`;

// datbase connection
const dbConnect = () => {
  mongoose
    .connect(MONGO_URL)
    .then((conn) => console.log(`Connected to DB : ${conn.connection.host}`))
    .catch((err) => console.log(err.message));
};

module.exports = dbConnect;
