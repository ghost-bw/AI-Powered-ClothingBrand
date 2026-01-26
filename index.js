import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js"; // ✅ correct

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const db_uri = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
