import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";
import {referralStore } from "./referralStore.js";
import { customerStore } from "./customerStore.js";

export const campaignStore = create((set, get) => ({
  campaigns: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  fetchCampaigns: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/campaign/list");
      set({ campaigns: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch campaigns");
    } finally {
      set({ isLoading: false });
    }
  },

  createCampaign: async (campaignData) => {
    set({ isCreating: true });
    try {
      const response = await axiosInstance.post("/campaign/create", campaignData);
      set({ campaigns: [...get().campaigns, response.data.campaign] });
      // const {sendReferralBulk} = referralStore.getState();
      // const campaign = campaignData;
      // const recipientEmails = customerStore.getState().customers.map((customer) => customer.email);
      // const bulkData = { campaign, recipientEmails };
      // console.log(bulkData);
      // await sendReferralBulk(bulkData);      
      toast.success(response.data.message);
      // toast.success("Referral links sent successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isCreating: false });
    }
  },

  updateCampaign: async (id, campaignData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/campaign/update/${id}`, campaignData);
      toast.success("Campaign updated");
      set({
        campaigns: get().campaigns.map((camp) => (camp._id === id ? response.data : camp)),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update campaign");
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteCampaign: async (id) => {
    set({ isDeleting: true });
    try {
      const response = await axiosInstance.delete(`/campaign/${id}`);
      toast.success(response.data.message);
      set({ campaigns: get().campaigns.filter((camp) => camp._id !== id) });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete campaign");
    } finally {
      set({ isDeleting: false });
    }
  },
}));
