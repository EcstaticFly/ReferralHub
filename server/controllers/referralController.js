import Referral from "../models/referral.js";
import Campaign from "../models/campaign.js";
import Customer from "../models/customer.js";
import {sendBulkEmail} from "../configs/utils.js";
import Reward from "../models/reward.js";
import crypto from "crypto";
const generateUniqueReferralCode = async () => {
  let referralCode;
  let exists = true;

  while (exists) {
    referralCode = crypto.randomBytes(4).toString("hex"); // Generates an 8-character code
    const existingCustomer = await Customer.findOne({ referralCode });
    exists = !!existingCustomer; // If found, keep generating
  }

  return referralCode;
};

export const sendReferralBulk = async (req, res) => {
  const { campaign, recipientEmails } = req.body;
  try {
    const referralLinks = await Promise.all(
      recipientEmails.map(async (email) => {
        const customer = await Customer.findOne({ businessId: req.user.id, email });
        let referralCode = "";
        if (customer) {
          referralCode = customer.referralCode;
          // Increment referralsSent by 1 for this customer.
          await Customer.findByIdAndUpdate(customer._id, { $inc: { referralsSent: 1 } });
        } else {
          referralCode = await generateUniqueReferralCode();
        }

        return {
          campaignId: campaign.campaignId,
          referredEmail: email,
          referralLink: `http://localhost:5173/api/referral/${referralCode}`,
        };
      })
    );

    await Referral.insertMany(referralLinks);

    await sendBulkEmail(
      recipientEmails,
      "Join our Referral Program!",
      campaign.campaignMessage
    );

    res.json({ message: "Referral emails sent successfully" });
  } catch (error) {
    console.error(error);
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
          businessId: req.user.id,
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

  export const showReferralDetails = async (req, res) => {};