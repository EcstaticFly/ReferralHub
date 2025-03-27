import Campaign from "../models/campaign.js";

export const createCampaign = async (req, res) => {
    try {
      const { name, description, rewardType, referrerReward, referredReward, expiresAt } = req.body;
  
      if (new Date(expiresAt) <= new Date()) {
        return res.status(400).json({ message: "Expiration date must be in the future" });
      }
  
      const campaign = new Campaign({
        businessId: req.business.id,
        name,
        description,
        rewardType,
        referrerReward,
        referredReward,
        expiresAt,
      });
  
      await campaign.save();
      res.status(201).json({ message: "Campaign created successfully", campaign });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ businessId: req.business.id });
    res.json(campaigns);
  } catch (error) {
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
  