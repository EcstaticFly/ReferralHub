import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { customerStore } from "../store/customerStore";

const CSVUploadSection = () => {
  const { isImporting, importCustomers } = customerStore();
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      await importCustomers(formData);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);
  
      await importCustomers(formData);
    }
  };

  return (
    <div
      className="
        border-2 border-dashed rounded-lg p-8 text-center 
        border-gray-300 dark:border-gray-600 hover:border-blue-500
      "
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
          {isImporting ? (
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="animate-spin text-blue-600 dark:text-blue-400" />
              <p className="text-gray-600 dark:text-gray-300">Importing...</p>
            </div>
          ) : (
            <FileSpreadsheet className="text-blue-600 dark:text-blue-400" />
          )}
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
};

export default CSVUploadSection;
