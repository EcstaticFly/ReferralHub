import React, { useState } from "react";
import { Plus, Filter, Sparkles, Trash2 } from "lucide-react";

const Campaigns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    rewardType: "discount",
    rewardValue: "",
    campaignMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAISuggestion = () => {
    setFormData((prev) => ({
      ...prev,
      campaignMessage: "Limited-time offer! Get amazing rewards now!",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Campaign:", formData);
  };

  const closeModal = () => setIsModalOpen(false);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const campaigns = [
    {
      name: "Summer Referral Program",
      startDate: "2024-05-31",
      endDate: "2025-08-30",
      referrals: 245,
      conversion: "32%",
      roi: "287%",
      description: "Increase reward by 10% to boost conversion rates during peak season",
    },
    {
      name: "Early Bird Special",
      startDate: "2024-04-30",
      endDate: "2024-05-30",
      referrals: 123,
      conversion: "28%",
      roi: "287%",
      description: "Consider extending campaign duration based on positive engagement",
    },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Your Referral Campaigns</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2" /> Create Campaign
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="p-2 bg-gray-800 rounded-lg w-full focus:ring focus:ring-blue-500"
        />
        <button className="bg-gray-700 p-2 rounded-lg">
          <Filter />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {campaigns.map((campaign, index) => {
          const isActive = new Date(campaign.endDate) >= new Date();
          return (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{campaign.name}</h3>
                <span className={`px-2 py-1 rounded-lg ${isActive ? "bg-green-600" : "bg-red-600"}`}>
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {campaign.startDate} - {campaign.endDate}
              </p>
              <div className="flex justify-between mt-2">
                <p>Referrals: {campaign.referrals}</p>
                <p>Conversion: {campaign.conversion}</p>
                <p>ROI: {campaign.roi}</p>
              </div>
              <p className="mt-2 text-gray-400">{campaign.description}</p>
              <button className="mt-2 text-red-400 hover:text-red-600">
                <Trash2 />
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-20 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl">Create Campaign</h2>
              <button onClick={closeModal} className="text-red-400">✖</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Campaign Name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today} // Prevent selection before today
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Start Date"
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="End Date"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select name="rewardType" value={formData.rewardType} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded">
                  <option value="discount">Discount</option>
                  <option value="payout">Payout</option>
                </select>
                <input type="number" name="rewardValue" placeholder="Reward Value(%)" value={formData.rewardValue} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
              </div>
              <div className="flex items-center gap-2">
                <input type="text" name="campaignMessage" placeholder="Campaign Message" value={formData.campaignMessage} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
                <button type="button" onClick={getAISuggestion} className="p-2 bg-blue-600 rounded">
                  <Sparkles />
                </button>
              </div>
              <button type="submit" className="w-full p-3 bg-green-600 rounded">Create Campaign</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
