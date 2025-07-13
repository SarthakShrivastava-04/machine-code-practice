import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const url = process.env.MONGO_URL;

export default async function connectDB () {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};
