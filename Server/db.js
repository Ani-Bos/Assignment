import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.f01hh.mongodb.net/contact?authSource=admin&replicaSet=atlas-ppw553-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
const mongoconnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default mongoconnect;
