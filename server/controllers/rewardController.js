import Reward from "../models/reward.js";
import Referral from "../models/referral.js";

export const issueReward = async (req, res) => {
  try {
    const { referralId, amount, type, payoutMethod } = req.body;

    const referral = await Referral.findById(referralId);
    if (!referral || referral.status !== "completed") {
      return res.status(400).json({ message: "Referral not eligible for reward" });
    }

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
