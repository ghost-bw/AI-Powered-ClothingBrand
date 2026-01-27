import express from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createCategory);
router.get("/", getAllCategories);

export default router;
