import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  FileSpreadsheet, 
  User as UserIcon 
} from 'lucide-react';


const Customers = () => {
  const [customers, setCustomers] = useState([
    // Placeholder customer data
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      referralCount: 15, 
      conversionRate: 45.5 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      referralCount: 22, 
      conversionRate: 38.2 
    }
  ]);
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate API call to import customers
      fetch('/import', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful import
        console.log('Import successful', data);
      })
      .catch(error => {
        console.error('Import failed', error);
      });
    }
  };

  // const onDrop = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
    
  //   // Create FormData to send file
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   // Simulate API call to import customers
  //   fetch('/import', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Handle successful import
  //     console.log('Import successful', data);
  //   })
  //   .catch(error => {
  //     console.error('Import failed', error);
  //   });
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: {
  //     'text/csv': ['.csv']
  //   }
  // });

  const MetricCard = ({ icon, title, value, color }) => (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-md p-6 
      flex items-center space-x-4
      hover:shadow-lg transition-shadow
    `}>
      <div className={`
        p-3 rounded-full 
        ${color} 
        bg-opacity-20 
        flex items-center justify-center
      `}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      </div>
    </div>
  );

  const CustomerItem = ({ name, email, referralCount, conversionRate }) => (
    <div className="
      flex items-center justify-between 
      bg-white dark:bg-gray-800 
      p-4 rounded-lg 
      shadow-sm hover:shadow-md 
      transition-shadow
    ">
      <div className="flex items-center space-x-4">
        <div className="
          bg-blue-100 dark:bg-blue-900
          p-2 rounded-full
        ">
          <UserIcon className="text-white" size={24} />
        </div>
        <div>
          <p className="font-semibold dark:text-white">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Referrals</p>
          <p className="font-semibold dark:text-white">{referralCount}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Conversion</p>
          <p className="font-semibold dark:text-white">{conversionRate}%</p>
        </div>
      </div>
    </div>
  );

  const CSVUploadSection = () => (
    <div className="
      border-2 border-dashed rounded-lg p-8 text-center 
      border-gray-300 dark:border-gray-600 hover:border-blue-500
    ">
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileChange}
        className="hidden" 
        id="csv-upload"
      />
      <label 
        htmlFor="csv-upload" 
        className="
          cursor-pointer block 
          text-blue-600 hover:text-blue-700 
          dark:text-blue-400 dark:hover:text-blue-500
        "
      >
        <div className="flex justify-center mb-4">
          <FileSpreadsheet 
            size={48} 
            className="text-gray-400 dark:text-gray-500" 
          />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Click to select a CSV file
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload customer data (CSV format)
        </p>
      </label>
    </div>
  );

  return (
    <div className="space-y-6 p-2">
      {/* Metrics Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <MetricCard 
          icon={<Users size={32} className="text-white" />}
          title="Total Customers"
          value={customers.length}
          color="bg-blue-600"
        />
        <MetricCard 
          icon={<TrendingUp size={32} className="text-white" />}
          title="Avg. Conversion Rate"
          value={`${(customers.reduce((sum, c) => sum + c.conversionRate, 0) / customers.length).toFixed(1)}%`}
          color="bg-green-600"
        />
      </div>

      {/* Customers List or Upload Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {customers.length > 0 ? 'Customer List' : 'Import Customers'}
        </h2>
        
        {customers.length > 0 ? (
          <div className="space-y-4">
            {customers.map((customer) => (
              <CustomerItem key={customer.id} {...customer} />
            ))}
          </div>
        ) : (
          <CSVUploadSection />
        )}
      </div>
    </div>
  );
};

export default Customers;
