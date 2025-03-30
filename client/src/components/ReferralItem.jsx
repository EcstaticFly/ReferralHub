import { UserIcon } from "lucide-react";

const ReferralItem = ({ referredEmail, createdAt, status }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full gap-4 sm:gap-6">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="bg-blue-500 dark:bg-blue-700 p-3 rounded-full flex items-center justify-center w-12 h-12">
          <UserIcon className="text-white" size={28} />
        </div>
        <div className="flex-1">
          <p className="font-semibold dark:text-white text-base break-words max-w-[250px] sm:max-w-full">
            {referredEmail}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Reward Status: {status}</p>
        </div>
      </div>

      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {formattedDate}
      </span>
    </div>
  );
};

export default ReferralItem;