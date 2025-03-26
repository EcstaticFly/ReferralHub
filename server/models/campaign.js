import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  name: { type: String, required: true },
  description: { type: String },
  rewardType: { type: String, enum: ["discount", "payout"], required: true },
  referrerReward: { type: Number, required: true },
  referredReward: { type: Number, required: true },
  status: { type: String, enum: ["active", "paused", "completed"], default: "active" },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error
const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default Campaign;
