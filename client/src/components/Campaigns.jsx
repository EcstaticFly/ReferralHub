import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Filter,
  Sparkles,
  Trash2,
  Edit,
  Mail,
  Loader,
  X,
  CheckCircle,
} from "lucide-react";
import { campaignStore } from "../store/campaignStore";
import { formatMessageTime } from "../configs/utils";
import { customerStore } from "../store/customerStore";
import { referralStore } from "../store/referralStore";
import { chatStore } from "../store/chatStore";

const taskOptions = [
  "Create Account",
  "Review",
  "Purchase",
  "Play a game",
  "Subscribe",
  "Share",
];

const filterOptions = [
  { value: "all", label: "All Campaigns" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "discount", label: "Discount" },
  { value: "payout", label: "Payout" },
];

const Campaigns = () => {
  const { getSuggestion } = chatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
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

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

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
  const { fetchCustomers, customers } = customerStore();

  const { sendReferralBulk, isSending } = referralStore();

  const filterDropdownRef = useRef(null);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAISuggestion = async () => {
    setIsSuggestionLoading(true);
    try {
      const campaignName = formData.name || "campaign";
      const campaignDescription = formData.description || "";
      const rewardType = formData.rewardType || "discount";
      const rewardValue = formData.rewardValue || "";

      const message = `Generate a single short, creative, engaging campaign message for my ${rewardType} referral program called "${campaignName}". The reward is ${rewardValue}% ${rewardType}. Additional info: ${campaignDescription}. Keep it under 150 characters. Don't use any formatting, headings or asterisks. Provide only plain text with no titles or sections. Don't give anything else other than the campaign message and reward details.`;

      const response = await getSuggestion(
        campaignName,
        campaignDescription,
        rewardType,
        rewardValue,
        message
      );

      if (response) {
        setFormData((prev) => ({
          ...prev,
          campaignMessage: response,
        }));
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);

      setFormData((prev) => ({
        ...prev,
        campaignMessage: `Join our "${formData.name}" referral program and earn rewards!`,
      }));
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  const handleSendMail = async (campaign) => {
    const recipientEmails = customers.map((customer) => customer.email);
    const bulkData = { recipientEmails, campaign };
    await sendReferralBulk(bulkData);
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
      task: campaign.task || "",
    });
    setIsEditing(true);
    setEditingCampaignId(campaign._id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteCampaign(id);
    closeModal();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
    setIsFilterDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());

    const isActive = new Date(campaign.endDate) >= new Date();

    switch (activeFilter) {
      case "active":
        return matchesSearch && isActive;
      case "completed":
        return matchesSearch && !isActive;
      case "discount":
        return matchesSearch && campaign.rewardType === "discount";
      case "payout":
        return matchesSearch && campaign.rewardType === "payout";
      default:
        return matchesSearch;
    }
  });

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
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 pl-3 pr-10 bg-gray-800 rounded-lg w-full focus:ring focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="relative" ref={filterDropdownRef}>
          <button
            className="bg-gray-700 p-2 rounded-lg flex items-center gap-2"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">
              {filterOptions.find((option) => option.value === activeFilter)
                ?.label || "Filter"}
            </span>
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                  onClick={() => handleFilterChange(option.value)}
                >
                  <span>{option.label}</span>
                  {activeFilter === option.value && (
                    <CheckCircle size={16} className="text-green-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(searchQuery || activeFilter !== "all") && (
        <div className="mb-4 flex flex-wrap gap-2">
          {searchQuery && (
            <div className="bg-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
              <span>Search: {searchQuery}</span>
              <button onClick={clearSearch} className="ml-1">
                <X size={14} />
              </button>
            </div>
          )}
          {activeFilter !== "all" && (
            <div className="bg-purple-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
              <span>
                Filter:{" "}
                {
                  filterOptions.find((option) => option.value === activeFilter)
                    ?.label
                }
              </span>
              <button
                onClick={() => handleFilterChange("all")}
                className="ml-1"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <div className="text-gray-400 text-sm flex items-center">
            <span>{filteredCampaigns?.length || 0} results</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCampaigns && filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => {
            const isActive = new Date(campaign.endDate) >= new Date();
            return (
              <div
                key={campaign._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
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
                  {formatMessageTime(campaign?.startDate)} -{" "}
                  {formatMessageTime(campaign?.endDate)}
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
                <p className="mt-2 text-gray-400 text-sm">
                  {campaign?.description}
                </p>
                <div className="flex justify-evenly gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="text-yellow-400 hover:text-yellow-600 cursor-pointer"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                  {isSending ? (
                    <div className="text-blue-400 pointer-events-none">
                      <Loader
                        className="animate-spin text-blue-400"
                        size={20}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSendMail(campaign)}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    >
                      <Mail size={20} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-400">
            {searchQuery || activeFilter !== "all"
              ? "No campaigns match your search or filter criteria."
              : "No campaigns found."}
          </p>
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
                  className="p-2 bg-blue-600 rounded cursor-pointer disabled:cursor-not-allowed hover:bg-blue-700 transition-colors disabled:opacity-70"
                  disabled={isSuggestionLoading}
                >
                  {isSuggestionLoading ? (
                    <Loader className="animate-spin text-white" size={18} />
                  ) : (
                    <Sparkles size={18} />
                  )}
                </button>
              </div>
              <button type="submit" className="w-full p-3 bg-green-600 rounded">
                {isEditing
                  ? "Update Campaign"
                  : isCreating
                  ? "Creating..."
                  : isUpdating
                  ? "Updating..."
                  : "Create Campaign"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
