import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  name: { type: String, required: true },
  description: { type: String },
  rewardType: { type: String, enum: ["discount", "payout"], required: true },
  task: { type: String, required: true},
  rewardValue: { type: Number, required: true },
  campaignMessage: { type: String, required: true },
  endDate: { type: Date, required: true },
  startDate: { type: Date, default: Date.now },
},
{
  timestamps: true,
});

// Prevent model overwrite error
const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default Campaign;
