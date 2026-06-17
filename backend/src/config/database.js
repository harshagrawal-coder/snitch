import mongoose from "mongoose";
import { Config } from "./Config.js";
async function connectToDb() {
  try {
    await mongoose.connect(Config.MONGO_URI);
    console.log("connect to db");
  } catch (error) {
    console.log("error", error);
  }
}
export default connectToDb
