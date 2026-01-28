// src/routes/product.routes.js
import express from "express";
import {
  // addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { addProduct } from "../controllers/product.controller.js";
import multer from "multer";

const router = express.Router();

// router.use(protect, isAdmin);

router.post("/", protect, isAdmin,addProduct);
router.get("/",getAllProducts);
router.put("/:id", protect, isAdmin,updateProduct);
router.delete("/:id", protect, isAdmin,deleteProduct);
// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.use(protect, isAdmin);

// Use upload.array for multiple images
router.post("/",  protect, isAdmin,upload.array("images", 5), addProduct);

export default router;
