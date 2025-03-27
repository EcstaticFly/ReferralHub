import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Megaphone,
  User as UserIcon,
} from "lucide-react";

const recentReferrals = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    timestamp: "2 hours ago",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    timestamp: "5 hours ago",
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    timestamp: "1 day ago",
  },
];

const Dashboard = () => {

  const MetricCard = ({ icon, title, value, color }) => (
    <div
      className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-md p-6 
      flex items-center space-x-4
      hover:shadow-lg transition-shadow
    `}
    >
      <div
        className={`
        p-3 rounded-full 
        ${color} 
        bg-opacity-20 
        flex items-center justify-center
      `}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      </div>
    </div>
  );

  const ReferralItem = ({ name, email, timestamp }) => (
    <div
      className="
      flex items-center justify-between 
      bg-white dark:bg-gray-800 
      p-4 rounded-lg 
      shadow-sm hover:shadow-md 
      transition-shadow
    "
    >
      <div className="flex items-center space-x-4">
        <div
          className="
          bg-blue-100 dark:bg-blue-900 
          p-2 rounded-full
        "
        >
          <UserIcon className="text-blue-600 dark:text-blue-300" size={24} />
        </div>
        <div>
          <p className="font-semibold dark:text-white">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">
        {timestamp}
      </span>
    </div>
  );

  return (
    <div className="space-y-6 p-2">
      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          icon={<Users size={32} className="text-white" />}
          title="Total Referrals"
          value="1,254"
          color="bg-blue-600"
        />
        <MetricCard
          icon={<TrendingUp size={32} className="text-white" />}
          title="Conversion Rate"
          value="24.5%"
          color="bg-green-600"
        />
        <MetricCard
          icon={<Megaphone size={32} className="text-white" />}
          title="Active Campaigns"
          value="12"
          color="bg-purple-600"
        />
      </div>

      {/* Recent Referrals */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Recent Referrals
        </h2>
        <div className="space-y-4">
          {recentReferrals.map((referral, index) => (
            <ReferralItem key={index} {...referral} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
