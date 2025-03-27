import React, { useEffect, useState, useRef } from "react";
import { Plus, Filter, Sparkles, Trash2, Edit } from "lucide-react";
import { campaignStore } from "../store/campaignStore";
import { formatMessageTime } from "../configs/utils";


const taskOptions = [
  "Create Account",
  "Review",
  "Purchase",
  "Play a game",
  "Subscribe",
  "Share",
];

const Campaigns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    rewardType: "discount",
    rewardValue: "",
    campaignMessage: "",
    task: "",
  });
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);

  const {
    campaigns,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    isCreating,
    isUpdating,
    isDeleting,
  } = campaignStore();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAISuggestion = () => {
    setFormData((prev) => ({
      ...prev,
      campaignMessage: "Limited-time offer! Get amazing rewards now!",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Updating Campaign:", { id: editingCampaignId, ...formData });
      updateCampaign(editingCampaignId, formData);
    } else {
      console.log("Submitting Campaign:", formData);
      await createCampaign(formData);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingCampaignId(null);
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      rewardType: "discount",
      rewardValue: "",
      campaignMessage: "",
      task: "",
    });
    setIsTaskDropdownOpen(false);
  };

  const handleEdit = (campaign) => {
    setFormData({
      name: campaign.name,
      description: campaign.description,
      startDate: new Date(campaign.startDate).toISOString().split("T")[0],
      endDate: new Date(campaign.endDate).toISOString().split("T")[0],
      rewardType: campaign.rewardType,
      rewardValue: campaign.rewardValue,
      campaignMessage: campaign.campaignMessage,
      task: campaign.task || "", // Preset task if available
    });
    setIsEditing(true);
    setEditingCampaignId(campaign._id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteCampaign(id);
    closeModal();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-semibold">Your Referral Campaigns</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
          }}
          className="flex items-center bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2" /> Create Campaign
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="p-2 bg-gray-800 rounded-lg w-full focus:ring focus:ring-blue-500"
        />
        <button className="bg-gray-700 p-2 rounded-lg">
          <Filter />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((campaign) => {
            const isActive = new Date(campaign.endDate) >= new Date();
            return (
              <div key={campaign._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{campaign?.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {isActive ? "Active" : "Completed"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  {formatMessageTime(campaign?.startDate)} - {formatMessageTime(campaign?.endDate)}
                </p>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">Referrals</span>
                    <span className="text-lg font-semibold text-blue-400">
                      {campaign?.referralCount}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">Type</span>
                    <span className="text-md font-semibold text-green-400">
                      {campaign?.rewardType}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">Reward</span>
                    <span className="text-lg font-semibold text-purple-400">
                      {campaign?.rewardValue}%
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-400 text-sm">{campaign?.description}</p>
                <div className="flex justify-evenly gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="text-yellow-400 hover:text-yellow-600 cursor-pointer"
                  >
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(campaign._id)} className="text-red-400 hover:text-red-600 cursor-pointer">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-400">No campaigns found.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl">
                {isEditing ? "Edit Campaign" : "Create Campaign"}
              </h2>
              <button onClick={closeModal} className="text-red-400 text-2xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Campaign Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              ></textarea>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="rewardType"
                  value={formData.rewardType}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                >
                  <option value="discount">Discount</option>
                  <option value="payout">Payout</option>
                </select>
                <input
                  type="number"
                  name="rewardValue"
                  placeholder="Reward Value(%)"
                  value={formData.rewardValue}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-sm text-gray-400 mb-1">Task</label>
                <div
                  className="w-full p-2 bg-gray-700 rounded cursor-pointer"
                  onClick={() => setIsTaskDropdownOpen(!isTaskDropdownOpen)}
                >
                  {formData.task || "Select Task"}
                </div>
                {isTaskDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded max-h-40 overflow-y-auto shadow-lg">
                    {taskOptions.map((task) => (
                      <div
                        key={task}
                        className="p-2 hover:bg-gray-600 cursor-pointer text-sm"
                        onClick={() => {
                          setFormData({ ...formData, task });
                          setIsTaskDropdownOpen(false);
                        }}
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="campaignMessage"
                  placeholder="Campaign Message"
                  value={formData.campaignMessage}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <button
                  type="button"
                  onClick={getAISuggestion}
                  className="p-2 bg-blue-600 rounded"
                >
                  <Sparkles />
                </button>
              </div>
              <button type="submit" className="w-full p-3 bg-green-600 rounded">
                {isEditing ? "Update Campaign" : "Create Campaign"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
