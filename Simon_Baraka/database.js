const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/Summartive_assessment";

function database() {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("An error occurred while running the database");
    });
}

module.exports = database;
