import Referral from "../models/referral.js";
import Campaign from "../models/campaign.js";
import {sendBulkEmail} from "../configs/utils.js";

export const sendReferralBulk = async (req, res) => {
    const { campaignId, recipientEmails } = req.body;
    try {
      const referralLinks = recipientEmails.map(email => ({
        campaignId,
        referredEmail: email,
        referralLink: `https://yourapp.com/ref/${Math.random().toString(36).slice(2, 10)}`,
      }));
  
      await Referral.insertMany(referralLinks);
  
      await sendBulkEmail(
        recipientEmails,
        "Join our Referral Program!",
        "Click on your unique referral link to participate!"
      );
  
      res.json({ message: "Referral emails sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getReferrals = async (req, res) => {
    try {
      const campaigns = await Campaign.find({ businessId: req.business.id }).select("_id");
  
      const referrals = await Referral.find({ campaignId: { $in: campaigns } })
        .populate("campaignId", "name") // Populate campaign details
        .populate("referrerId", "name email") // Populate referrer details
        .select("referredEmail referralLink status createdAt");
  
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const updateReferralStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const referralId = req.params.id;
  
      const referral = await Referral.findById(referralId);
      if (!referral) return res.status(404).json({ message: "Referral not found" });
  
      referral.status = status;
      await referral.save();
  
      // If referral is completed, issue rewards
      if (status === "completed") {
        const reward = new Reward({
          businessId: req.business.id,
          customerId: referral.referrerId,
          campaignId: referral.campaignId,
          type: "payout", // Default to payout (can be modified later)
          amount: 10, // Example amount (can be fetched from campaign settings)
          status: "pending",
        });
        await reward.save();
      }
  
      res.json({ message: "Referral status updated", referral });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };