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
    // Process each email
    const referrals = await Promise.all(
      recipientEmails.map(async (email) => {
        const customer = await Customer.findOne({
          businessId: req.user.id,
          email,
        });
        if (!customer) {
          return null; // Skip if no customer found
        }

        // Generate or use existing referralCode
        let referralCode = customer.referralCode;
        if (!referralCode) {
          referralCode = await generateUniqueReferralCode();
          customer.referralCode = referralCode;
          await customer.save();
        }

        // Create a referral object (initially without referralId in the link)
        const newReferral = new Referral({
          campaignId: campaign._id,
          referrerId: customer._id,
          referredEmail: email,
          rewardType: campaign.rewardType,
          task: campaign.task,
          rewardValue: campaign.rewardValue,
        });

        const savedReferral = await newReferral.save(); // Save to get _id

        // Generate the referral link with referralId
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
        )}&referralId=${encodeURIComponent(
          savedReferral._id // Include referralId in the URL
        )}`;

        // Update the saved referral with the correct link
        savedReferral.referralLink = updatedReferralLink;
        await savedReferral.save();

        return { ...savedReferral.toObject(), referralLink: updatedReferralLink };
      })
    );

    // Filter out null values (emails that were skipped)
    const validReferrals = referrals.filter((ref) => ref !== null);

    // Send bulk emails with updated referral links
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


export const getReferrals = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      businessId: req.user.id,
    }).select("_id");

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
    const { status, businessId, payoutMethod, email } = req.body;
    const referralId = req.params.id;

    console.log(referralId, status, businessId, payoutMethod, email);

    // First, find the referral to make sure it exists
    const referral = await Referral.findById(referralId);
    if (!referral) return res.status(404).json({ message: "Referral not found" });

    // Update the referral status
    const updatedReferral = await Referral.findByIdAndUpdate(
      referralId,
      { status },
      { new: true }
    ).populate('campaignId'); // Populate campaign details for reward creation

    console.log("Referral status updated:", updatedReferral);

    // If referral is completed, issue rewards
    if (status === "completed") {
      console.log("Processing completed referral");
      
      // Validate required fields before creating reward
      if (!businessId || !updatedReferral.referrerId || !email) {
        return res.status(400).json({ 
          message: "Missing required fields for reward creation",
          missing: {
            businessId: !businessId,
            referrerId: !updatedReferral.referrerId,
            email: !email
          }
        });
      }

      // Convert string IDs to ObjectIds if they aren't already
      const businessObjectId = mongoose.Types.ObjectId.isValid(businessId) 
        ? businessId 
        : new mongoose.Schema.Types.ObjectId(businessId);
      
      // Create the reward
      const reward = new Reward({
        businessId: businessObjectId,
        customerId: updatedReferral.referrerId, // This should already be an ObjectId
        referredEmail: updatedReferral.referredEmail, // Person who sent the referral
        receivedEmail: email, // Person who received the referral
        campaignId: updatedReferral.campaignId, // Should already be an ObjectId
        type: updatedReferral.rewardType,
        amount: updatedReferral.rewardValue,
        status: "pending", // Start as pending, not completed
        payoutMethod: payoutMethod || "Stripe", // Default to Stripe if not provided
      });
      
      console.log("Attempting to save reward:", reward);
      
      // Save the reward and handle any validation errors
      const savedReward = await reward.save();
      console.log("Reward created successfully:", savedReward);
      // Send a confirmation email to the customer
      await sendBulkEmail(
        [updatedReferral.referredEmail, email].filter(Boolean), // ✅ Remove undefined values
        "Thank you for your referral! Here is your reward!",
        `${reward.type} - ${reward.amount}% ${reward.payoutMethod}`,
        [] // Pass a valid array with the referral object
      );
      
      
      // Update the referral to indicate reward has been given
      await Referral.findByIdAndUpdate(referralId, { rewardGiven: true });
    }

    res.json({ message: "Referral status updated", updatedReferral });
  } catch (error) {
    console.error("Error updating referral status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};