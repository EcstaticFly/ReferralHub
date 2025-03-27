import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const referralStore = create((set, get) => ({
  referrals: [],
  isLoading: false,
  isSending: false,
  isUpdating: false,

  fetchReferrals: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/referral/list");
      set({ referrals: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch referrals");
    } finally {
      set({ isLoading: false });
    }
  },

  sendReferral: async (referralData) => {
    set({ isSending: true });
    try {
      const response = await axiosInstance.post("/referral/send", referralData);
      toast.success(response.data.message);
      // Optionally, add new referral to state
      set({ referrals: [...get().referrals, response.data.referral] });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send referral");
    } finally {
      set({ isSending: false });
    }
  },

  sendReferralBulk: async (bulkData) => {
    set({ isSending: true });
    try {
      const response = await axiosInstance.post("/referral/send-bulk", bulkData);
      toast.success(response.data.message);
      // Optionally, refresh referral list after sending
      await get().fetchReferrals();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send bulk referrals");
    } finally {
      set({ isSending: false });
    }
  },

  updateReferralStatus: async (id, statusData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put(`/referral/update/${id}`, statusData);
      toast.success("Referral updated");
      set({
        referrals: get().referrals.map((ref) => (ref._id === id ? response.data.referral : ref)),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update referral");
    } finally {
      set({ isUpdating: false });
    }
  },
}));
