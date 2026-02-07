import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: String,
    type: String,
    discountValue: Number,
    minSpend: Number,
    status: { type: String, default: "Active" },
    validity: { type: String, default: "Permanent" },
    usage: { type: String, default: "0 / 1000" },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
