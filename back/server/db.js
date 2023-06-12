const mongoose = require("mongoose");
const { dbConnectionUri } = require("./config");

mongoose
  .connect(dbConnectionUri)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

module.exports = mongoose;
