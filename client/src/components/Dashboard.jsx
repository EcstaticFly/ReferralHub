import React, { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  Megaphone,
  User as UserIcon,
} from "lucide-react";
import { dashboardStore } from "../store/dashboardStore";
import MetricCard from "./MetricCard";
import ReferralItem from "./ReferralItem";

const Dashboard = () => {
  const { stats , fetchStats} = dashboardStore();
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-2">
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          icon={<Users size={32} className="text-white" />}
          title="Total Referrals"
          value={stats?.totalReferrals}
          color="bg-blue-600"
        />
        <MetricCard
          icon={<TrendingUp size={32} className="text-white" />}
          title="Conversion Rate"
          value={`${ stats?.totalReferrals !==0 ? ((stats?.successfulReferrals / stats?.totalReferrals) * 100).toFixed(2) : 0}%`}
          color="bg-green-600"
        />
        <MetricCard
          icon={<Megaphone size={32} className="text-white" />}
          title="Total Campaigns"
          value={stats?.totalCampaigns}
          color="bg-purple-600"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Recent Referrals
        </h2>
        <div className="space-y-4">
        {
          stats?.mostRecentReferrals && stats?.mostRecentReferrals.length > 0 ? (
            stats?.mostRecentReferrals.map((referral, index) => (
              <ReferralItem key={index} {...referral} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No recent referrals found.</p>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
