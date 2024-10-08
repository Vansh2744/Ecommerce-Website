import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );

    console.log(
      "Database Connected at host : ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Unable to connect database : ",error.message);
    
  }
};

export default connectDB;
