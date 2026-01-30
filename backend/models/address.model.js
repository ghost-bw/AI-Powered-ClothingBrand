import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: String,
    name: String,
    address: String,
    phone: String,
    default: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
