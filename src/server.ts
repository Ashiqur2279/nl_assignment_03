import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middleware to parse JSON bodies
app.use(express.json());

//mongodb connect
mongoose
  .connect(process.env.DATABASE_URL || "", {})
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/api/books", (req, res) => {
  res.json({ message: "Book received", data: req.body });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
