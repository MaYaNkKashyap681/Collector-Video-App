const mongoose = require("mongoose");

function connectDb(url) {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database Successfully Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDb;
