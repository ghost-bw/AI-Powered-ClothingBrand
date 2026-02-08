import mongoose from "mongoose";

const refundRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    type: {
      type: String,
      enum: ["cancel", "return"],
      required: true,
    },

    bankDetails: {
      bankName: String,
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      upi: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RefundRequest", refundRequestSchema);
