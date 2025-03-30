import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { referralStore } from "../store/referralStore";

const ReferralPage = () => {
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  const { updateReferralStatus } = referralStore();

  // Extract campaign details from URL
  const campaignName = searchParams.get("campaignName");
  const campaignDescription = searchParams.get("campaignDescription");
  const task = searchParams.get("task");
  const code = searchParams.get("code");
  const campaignId = searchParams.get("campaignId");
  const rewardValue = searchParams.get("rewardValue");
  const rewardType = searchParams.get("rewardType");
  const businessId = searchParams.get("businessId");
  const referralId = searchParams.get("referralId"); // Extract referralId

  const [status, setStatus] = useState("pending");
  const [email, setEmail] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("Stripe");

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handlePayoutSelect = (selectedMethod) => {
    setPayoutMethod(selectedMethod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting referral data:", {
      email,
      task,
      code,
      status,
      businessId,
      payoutMethod,
      referralId,
    });
    if (email !== "") {
      await updateReferralStatus(referralId, status, businessId, payoutMethod, email);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Referral Confirmation
        </h2>

        {/* Referral ID */}
        {/* <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Referral ID</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{referralId || "N/A"}</div>
        </div> */}

        {/* Campaign Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Campaign Name</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{campaignName || "N/A"}</div>
        </div>

        {/* Campaign Description */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Campaign Description</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{campaignDescription || "N/A"}</div>
        </div>

        {/* Task */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Task</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{task || "N/A"}</div>
        </div>

        {/* Referral Code */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Referral Code</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{code || "N/A"}</div>
        </div>

        {/* Reward Details */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Reward Type</label>
            <div className="p-3 bg-green-100 rounded border text-green-700 font-medium">
              {rewardType || "N/A"}
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Reward Value</label>
            <div className="p-3 bg-green-100 rounded border text-green-700 font-medium">
              {rewardValue ? `${rewardValue}%` : "N/A"}
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Your Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Status Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Task Status</label>
          <div className="flex space-x-4">
            <div
              className={`flex-1 p-3 text-center rounded border cursor-pointer transition-colors ${
                status === "pending" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleStatusSelect("pending")}
            >
              Pending
            </div>
            <div
              className={`flex-1 p-3 text-center rounded border cursor-pointer transition-colors ${
                status === "completed" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleStatusSelect("completed")}
            >
              Completed
            </div>
          </div>
        </div>

        {/* Payout Method Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Payout Method</label>
          <div className="flex space-x-4">
            {["Stripe", "PayPal", "Razorpay"].map((method) => (
              <div
                key={method}
                className={`flex-1 p-3 text-center rounded border cursor-pointer transition-colors ${
                  payoutMethod === method ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handlePayoutSelect(method)}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReferralPage;
