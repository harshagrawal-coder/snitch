import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();