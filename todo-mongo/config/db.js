import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const URL = process.env.MONGO_URL;

export default connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};
