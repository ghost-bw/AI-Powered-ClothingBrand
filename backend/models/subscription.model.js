import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: String,
  phone: String,
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Subscription", subscriptionSchema);
