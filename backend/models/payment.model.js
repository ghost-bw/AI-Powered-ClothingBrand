import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      default: "Customer", // 👈 NO required
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      enum: ["upi", "card", "netbanking", "cod"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

// 🔥 PREVENT DUPLICATE MODEL REGISTRATION
export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
