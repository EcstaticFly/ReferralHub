import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  referralCode: { type: String, unique: true, sparse: true }, // Optional and indexed properly
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", default: null, sparse: true }, // Optional
  rewardsEarned: { type: Number, default: 0 },
  referralsSent: { type: Number, default: 0 }, // New field for number of referrals sent
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
