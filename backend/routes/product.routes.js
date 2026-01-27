import express from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Admin: Create product with images
router.post(
  "/",
  protect,
  isAdmin,
  (req, res, next) => {
    upload.array("images", 5)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  createProduct
);


// Public
router.get("/", getProducts);

export default router;
