// src/routes/dashboard.routes.js
import express from "express";
import {
  getDashboardStats,
  getMonthlyRevenue,
  getCategorySales,
} from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);
router.get("/revenue", getMonthlyRevenue);
router.get("/category-sales", getCategorySales);

export default router;
