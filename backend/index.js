import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import path  from "path";

// import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/admin.product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import productRoutes from "./routes/admin.product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userdashboardRoutes from "./routes/userdashboard.routes.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ================= MIDDLEWARE ================= */
app.use(express.json());               // 🔥 REQUIRED for req.body
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ================= ROUTES ================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/user/dashboard",userdashboardRoutes);






/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Graphura Backend is running 🚀");
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });