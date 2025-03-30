import { UserIcon } from "lucide-react";

const CustomerItem = ({ name, email, referralCount, rewards }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full flex flex-col sm:flex-row sm:items-center gap-4">

    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
      <UserIcon className="text-blue-600 dark:text-white" size={24} />
    </div>

    <div className="flex-1">
      <p className="font-semibold text-lg dark:text-white">{name}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm break-words max-w-full">{email}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center">
      <div className="text-center sm:text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400">Referrals</p>
        <p className="font-semibold text-lg dark:text-white">{referralCount || 0}</p>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400">Rewards</p>
        <p className="font-semibold text-lg dark:text-white">{rewards || 0}</p>
      </div>
    </div>

  </div>
);

export default CustomerItem;
