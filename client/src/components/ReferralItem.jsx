import { UserIcon } from "lucide-react";



const ReferralItem = ({ referredEmail, createdAt, status }) => {
  const formattedDate = new Date(createdAt).toLocaleString();
  
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <UserIcon className="text-blue-600 dark:text-blue-300" size={24} />
        </div>
        <div>
          <p className="font-semibold dark:text-white">Referral to: {referredEmail}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Status: {status}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">
        {formattedDate}
      </span>
    </div>
  );
};
export default ReferralItem;