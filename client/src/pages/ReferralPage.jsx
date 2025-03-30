import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ReferralPage = () => {
  const [searchParams] = useSearchParams();
  const task = searchParams.get("task");
  const code = searchParams.get("code");

  const [status, setStatus] = useState("Pending");

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process submission here
    console.log("Submitting referral data:", { task, code, status });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Referral Confirmation</h2>

        {/* Task Display */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Task</label>
          <div className="p-3 bg-gray-200 rounded border break-words">
            {task}
          </div>
        </div>

        {/* Referral Code Display */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Referral Code</label>
          <div className="p-3 bg-gray-200 rounded border break-words">
            {code}
          </div>
        </div>

        {/* Status Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
          <div className="flex space-x-4">
            <div
              className={`flex-1 p-3 text-center rounded border cursor-pointer transition-colors ${
                status === "Pending" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleStatusSelect("Pending")}
            >
              Pending
            </div>
            <div
              className={`flex-1 p-3 text-center rounded border cursor-pointer transition-colors ${
                status === "Completed" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleStatusSelect("Completed")}
            >
              Completed
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReferralPage;
