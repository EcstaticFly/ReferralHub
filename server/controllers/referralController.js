import Referral from "../models/referral.js";
import Campaign from "../models/campaign.js";
import Customer from "../models/customer.js";
import { sendBulkEmail } from "../configs/utils.js";
import Reward from "../models/reward.js";
import crypto from "crypto";
import mongoose from "mongoose";

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
    const referrals = await Promise.all(
      recipientEmails.map(async (email) => {
        const customer = await Customer.findOne({
          businessId: req.user.id,
          email,
        });

        if (!customer) {
          return null;
        }

        let referralCode = customer.referralCode;
        if (!referralCode) {
          referralCode = await generateUniqueReferralCode();
          customer.referralCode = referralCode;
          await customer.save();
        }

        const newReferral = new Referral({
          campaignId: campaign._id,
          referrerId: customer._id,
          referredEmail: email,
          rewardType: campaign.rewardType,
          task: campaign.task,
          rewardValue: campaign.rewardValue,
        });

        const savedReferral = await newReferral.save();

        // Update referralsSent count for the customer
        await Customer.findByIdAndUpdate(customer._id, {
          $inc: { referralsSent: 1 },
        });

        const updatedReferralLink = `http://localhost:5173/referral?task=${encodeURIComponent(
          campaign.task
        )}&code=${encodeURIComponent(
          referralCode
        )}&campaignId=${encodeURIComponent(
          campaign._id
        )}&rewardValue=${encodeURIComponent(
          campaign.rewardValue
        )}&rewardType=${encodeURIComponent(
          campaign.rewardType
        )}&campaignName=${encodeURIComponent(
          campaign.name
        )}&campaignDescription=${encodeURIComponent(
          campaign.description
        )}&businessId=${encodeURIComponent(
          campaign.businessId
        )}&referralId=${encodeURIComponent(savedReferral._id)}`;

        savedReferral.referralLink = updatedReferralLink;
        await savedReferral.save();

        return { ...savedReferral.toObject(), referralLink: updatedReferralLink };
      })
    );

    const validReferrals = referrals.filter((ref) => ref !== null);

    await sendBulkEmail(
      recipientEmails,
      "Join our Referral Program!",
      campaign.campaignMessage,
      validReferrals
    );

    res.json({ message: "Referral emails sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReferralStatus = async (req, res) => {
  try {
    const { status, businessId, payoutMethod, email } = req.body;
    const referralId = req.params.id;

    console.log(referralId, status, businessId, payoutMethod, email);

    const referral = await Referral.findById(referralId);
    if (!referral) return res.status(404).json({ message: "Referral not found" });

    const updatedReferral = await Referral.findByIdAndUpdate(
      referralId,
      { status },
      { new: true }
    ).populate("campaignId");

    console.log("Referral status updated:", updatedReferral);

    if (status === "completed") {
      console.log("Processing completed referral");

      if (!businessId || !updatedReferral.referrerId || !email) {
        return res.status(400).json({
          message: "Missing required fields for reward creation",
          missing: {
            businessId: !businessId,
            referrerId: !updatedReferral.referrerId,
            email: !email,
          },
        });
      }

      const businessObjectId = mongoose.Types.ObjectId.isValid(businessId)
        ? businessId
        : new mongoose.Schema.Types.ObjectId(businessId);

      const reward = new Reward({
        businessId: businessObjectId,
        customerId: updatedReferral.referrerId,
        referredEmail: updatedReferral.referredEmail,
        receivedEmail: email,
        campaignId: updatedReferral.campaignId,
        type: updatedReferral.rewardType,
        amount: updatedReferral.rewardValue,
        status: "pending",
        payoutMethod: payoutMethod || "Stripe",
      });

      console.log("Attempting to save reward:", reward);

      const savedReward = await reward.save();
      console.log("Reward created successfully:", savedReward);

      // Update rewardsEarned for the referrer
      const rewardIncrement = updatedReferral.rewardValue / 100;
      await Customer.findByIdAndUpdate(updatedReferral.referrerId, {
        $inc: { rewardsEarned: rewardIncrement },
      });

      await sendBulkEmail(
        [updatedReferral.referredEmail, email].filter(Boolean),
        "Thank you for your referral! Here is your reward!",
        `${reward.type} - ${reward.amount}% ${reward.payoutMethod}`,
        []
      );

      await Referral.findByIdAndUpdate(referralId, { rewardGiven: true });
    }

    res.json({ message: "Referral status updated", updatedReferral });
  } catch (error) {
    console.error("Error updating referral status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReferrals = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      businessId: req.user.id,
    }).select("_id");

    const referrals = await Referral.find({ campaignId: { $in: campaigns } })
      .populate("campaignId", "name")
      .populate("referrerId", "name email") 
      .select("referredEmail referralLink status createdAt");

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};