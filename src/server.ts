import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import app from "./app";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const port = process.env.PORT || 5000;
const database_url = process.env.DATABASE_URL;

async function main() {
  try {
    if (!database_url) {
      throw new Error("DATABASE_URL is not defined!");
    }
    await mongoose.connect(database_url);
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`📚 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error: ", err);
  }
}

main();
