import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: String,
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
