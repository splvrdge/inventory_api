const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.error("Please check:");
    console.error("1. Your IP is whitelisted in MongoDB Atlas");
    console.error("2. Your username and password are correct");
    console.error("3. The cluster is running and accessible");
    process.exit(1);
  }
};

module.exports = connectDB;
