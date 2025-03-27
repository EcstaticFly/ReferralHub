import Campaign from "../models/campaign.js";
import mongoose from "mongoose";

export const createCampaign = async (req, res) => {
    try {
      console.log("hey");
      const { name, description, rewardType, rewardValue ,startDate, endDate, campaignMessage } = req.body;
  
      if (new Date(endDate) <= new Date() || (new Date(startDate) >= new Date(endDate))) {
        return res.status(400).json({ message: "Expiration date must be in the future" });
      }
  
      const campaign = new Campaign({
        businessId: req.user.id,
        name,
        description,
        rewardType,
        rewardValue,
        startDate,
        endDate,
        campaignMessage,
      });
      console.log("hey2");
  
      await campaign.save();
      res.status(201).json({ message: "Campaign created successfully", campaign });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.aggregate([
        {
          $match: {
            businessId: new mongoose.Types.ObjectId(String(req.user.id)),
          },
        },
        {
          $lookup: {
            from: "referrals",
            localField: "_id",
            foreignField: "campaignId",
            as: "referrals",
          },
        },
        {
          $addFields: {
            referralCount: { $size: "$referrals" },
          },
        },
        {
          $project: {
            referrals: 0, // referral details not needed
          },
        },
      ]);
      console.log(campaigns);
      res.json(campaigns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

export const updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

  export const checkAndExpireCampaigns = async () => {
    try {
      await Campaign.updateMany(
        { expiresAt: { $lt: new Date() }, status: "active" },
        { status: "completed" }
      );
      console.log("Expired campaigns updated.");
    } catch (error) {
      console.error("Error updating expired campaigns:", error);
    }
  };
  