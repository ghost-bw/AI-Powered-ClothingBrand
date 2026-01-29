import mongoose from "mongoose";

/* CART ITEM SUBSCHEMA */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  size: String,
  color: String,
});

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  phone: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  addresses: [],

  /* ================= CART ================= */
  cart: [cartItemSchema],

  /* ================= WISHLIST ================= */
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

},{timestamps:true});

export default mongoose.model("User", userSchema);
