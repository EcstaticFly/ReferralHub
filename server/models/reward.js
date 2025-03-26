import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  type: { type: String, enum: ["discount", "payout"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  payoutMethod: { type: String, enum: ["Stripe", "PayPal", "Razorpay"], default: "Stripe" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reward", rewardSchema);
