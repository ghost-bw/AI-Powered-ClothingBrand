import express from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createCategory);
router.get("/", getAllCategories);

export default router;
