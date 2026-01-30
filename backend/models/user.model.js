import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  name: String,
  price: Number,
  image: String,

  size: String,
  color: String,

  quantity: {
    type: Number,
    default: 1
  }
});

const wishlistSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  name: String,
  price: Number,
  image: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  cart: [cartSchema],
  wishlist: [wishlistSchema],

  addresses: [],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
