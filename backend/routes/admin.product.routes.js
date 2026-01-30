import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct        // <-- ADD THIS
} from "../controllers/product.controller.js";
import  protect  from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// CREATE
router.post("/", protect, isAdmin, upload.any(), addProduct);

// GET ALL
router.get("/", getAllProducts);

// GET SINGLE PRODUCT  🔥 ADD THIS
router.get("/:id", getSingleProduct);

// UPDATE
router.put("/:id", protect, isAdmin, upload.any(), updateProduct);

// DELETE
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
