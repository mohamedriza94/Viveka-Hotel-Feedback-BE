import mongoose from "mongoose";
import { envData } from "../constants/env-data";

const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://mohamedriza94:vivekahotel123@cluster0.toy1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(envData.mongodbURI || connectionString);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
