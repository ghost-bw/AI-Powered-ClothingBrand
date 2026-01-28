// src/models/Product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    /* ===== USER VISIBLE ===== */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      enum: ["Shirts", "Ethnic Wear", "Outerwear", "Accessories"],
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    images: {
      type: [String], // Cloudinary / S3 URLs
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ===== ADMIN / BACKEND ONLY ===== */
    totalSold: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
