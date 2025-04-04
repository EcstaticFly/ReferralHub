import Campaign from "../models/campaign.js";
import Referral from "../models/referral.js";

export const getDashboardStats = async (req, res) => {
  try {
    const businessId = req.user.id;
    // console.log(businessId);
    

    const campaigns = await Campaign.find({ businessId }).select("_id");
    const campaignIds = campaigns.map(camp => camp._id);

    const totalCampaigns = await Campaign.countDocuments({ businessId });
    const totalReferrals = await Referral.countDocuments({ campaignId: { $in: campaignIds } });
    const successfulReferrals = await Referral.countDocuments({ 
      campaignId: { $in: campaignIds }, 
      status: "completed" 
    });


    const mostRecentReferrals = await Referral.find({ campaignId: { $in: campaignIds } })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCampaigns,
      totalReferrals,
      successfulReferrals,
      mostRecentReferrals
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
