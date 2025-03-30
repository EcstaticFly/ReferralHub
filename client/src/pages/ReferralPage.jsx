import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { referralStore } from "../store/referralStore";

const ReferralPage = () => {
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  const { updateReferralStatus } = referralStore();

  const campaignName = searchParams.get("campaignName");
  const campaignDescription = searchParams.get("campaignDescription");
  const task = searchParams.get("task");
  const code = searchParams.get("code");
  const campaignId = searchParams.get("campaignId");
  const rewardValue = searchParams.get("rewardValue");
  const rewardType = searchParams.get("rewardType");
  const businessId = searchParams.get("businessId");
  const referralId = searchParams.get("referralId");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    console.log("Submitting referral data:", {
      email,
      task,
      code,
      status,
      businessId,
      payoutMethod,
      referralId,
    });
    try {
      if (email !== "") {
        await updateReferralStatus(referralId, status, businessId, payoutMethod, email);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update referral status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Referral Confirmation
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Campaign Name</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{campaignName || "N/A"}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Campaign Description</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{campaignDescription || "N/A"}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Task</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{task || "N/A"}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Referral Code</label>
          <div className="p-3 bg-gray-200 rounded border break-words">{code || "N/A"}</div>
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">Your Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            placeholder="Enter your email to receive the reward"
          />
        </div>

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

        <button 
          type="submit" 
          className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded font-semibold flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ReferralPage;
