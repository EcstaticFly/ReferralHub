import React, { useEffect } from "react";
import { Users, TrendingUp, User as UserIcon } from "lucide-react";
import { customerStore } from "../store/customerStore";
import CSVUploadSection from "./CSVuploadSection";
import CustomerItem from "./CustomerItem";

const Customers = () => {
  const { customers, totalRewards, fetchCustomers } = customerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

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
          ${color} bg-opacity-20 
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



  return (
    <div className="space-y-6 p-2">

      <div className="grid md:grid-cols-2 gap-6">
        <MetricCard
          icon={<Users size={32} className="text-white" />}
          title="Total Customers"
          value={customers?.length}
          color="bg-blue-600"
        />
        <MetricCard
          icon={<TrendingUp size={32} className="text-white" />}
          title="Total Rewards"
          value={totalRewards}
          color="bg-green-600"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Import Customers
        </h2>
        <CSVUploadSection />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Customers
        </h2>
        <div className="space-y-4">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerItem
                key={customer?._id}
                name={customer?.name}
                email={customer?.email}
                referralCount={customer?.referralsSent}
                rewards={customer?.rewardsEarned}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No customers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
