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

export default MetricCard;
