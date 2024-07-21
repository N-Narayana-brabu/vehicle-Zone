const mongoose = require("mongoose");
const config = require("../configurations/centralized-configuration");
const dbUrl = config.dbUrl;

const connectToDatabase = async (req, res, next) => {
  console.log("connectToDatabase function called");

  try {
    if (mongoose.connection.readyState === 0) { // 0 means disconnected
      await mongoose.connect(dbUrl, {
        // No need for useNewUrlParser and useUnifiedTopology options
      });
      console.log("Connected to the database successfully");
    }
    req.db = mongoose.connection;
    next();
  } catch (error) {
    console.error("Failed to connect to the database", error);
    next(error);
  }
};

module.exports = connectToDatabase;
