import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },
    discountPrice: { type: Number },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    sizes: [String],        // ["S", "M", "L", "XL"]
    colors: [String],       // ["Black", "White"]

    stock: { type: Number, default: 0 },

    images: [String],       // Cloudinary URLs 

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false }
  },
  { timestamps: true }
);

//  Text search support
productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
