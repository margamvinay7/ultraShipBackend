const mongoose = require("mongoose");

// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "utlraShipTms" });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
