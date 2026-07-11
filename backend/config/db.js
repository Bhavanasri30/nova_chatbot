import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  console.log("URI exists:", !!MONGO_URI);

  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;