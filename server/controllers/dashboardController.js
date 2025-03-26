import Business from "../models/Business.js";
import Campaign from "../models/Campaign.js";
import Referral from "../models/Referral.js";
import Customer from "../models/Customer.js";

export const getDashboardStats = async (req, res) => {
  try {
    const businessId = req.business.id;

    const totalCustomers = await Customer.countDocuments({ businessId });
    const totalCampaigns = await Campaign.countDocuments({ businessId });
    const totalReferrals = await Referral.countDocuments({ campaignId: { $in: await Campaign.find({ businessId }).select("_id") } });
    const successfulReferrals = await Referral.countDocuments({ campaignId: { $in: await Campaign.find({ businessId }).select("_id") }, status: "completed" });

    res.json({
      totalCustomers,
      totalCampaigns,
      totalReferrals,
      successfulReferrals,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
