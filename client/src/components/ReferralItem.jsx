import { UserIcon } from "lucide-react";

const ReferralItem = ({ referredEmail, createdAt, status }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="flex flex-wrap sm:flex-col sm:items-start items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <UserIcon className="text-blue-600 dark:text-blue-300" size={24} />
        </div>
        <div>
          <p className="font-semibold dark:text-white break-words max-w-[250px] sm:max-w-full">
            Referral to: {referredEmail}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Reward Status: {status}
          </p>
        </div>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 sm:mt-2">
        {formattedDate}
      </span>
    </div>
  );
};

export default ReferralItem;
