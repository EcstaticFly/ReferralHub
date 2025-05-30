import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  referredEmail: { type: String, required: true },
  referralLink: { type: String },
  rewardType: { type: String, enum: ["discount", "payout"], default: "discount" },
  task: { type: String, required: true }, 
  rewardValue: { type: Number, default: 10 }, 
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  rewardGiven: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.models.Referral || mongoose.model("Referral", referralSchema);

export default Referral;
