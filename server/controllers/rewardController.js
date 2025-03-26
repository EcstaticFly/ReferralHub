import Reward from "../models/reward.js";
import Referral from "../models/referral.js";

export const issueReward = async (req, res) => {
  try {
    const { referralId, amount, type, payoutMethod } = req.body;

    const referral = await Referral.findById(referralId);
    if (!referral || referral.status !== "completed") {
      return res.status(400).json({ message: "Referral not eligible for reward" });
    }
    // Check if reward has already been issued
    const reward = await Reward.findOne({ customerId: referral.referrerId, campaignId: referral.campaignId });
    if (reward) {
      return res.status(400).json({ message: "Reward already issued" });
    }
    // Create a new reward document
    const newReward = new Reward({
      businessId: req.business.id,
      customerId: referral.referrerId,
      campaignId: referral.campaignId,
      type,
      amount,
      payoutMethod,
    });

    await newReward.save();
    res.status(201).json({ message: "Reward issued successfully", reward: newReward });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
