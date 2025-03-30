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
  
  sendReferralBulk: async (bulkData) => {
    set({ isSending: true });
    try {
      const response = await axiosInstance.post("/referral/send-bulk", bulkData);
      toast.success(response.data.message);
      await get().fetchReferrals();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send bulk referrals");
    } finally {
      set({ isSending: false });
    }
  },

  updateReferralStatus: async (id, status, businessId, payoutMethod,email) => {
    set({ isUpdating: true });
    // console.log(id, status, businessId, payoutMethod, email);
    try {
      const response = await axiosInstance.put(`/referral/update/${id}`, {status, businessId, payoutMethod, email});
      toast.success("Referral updated");
      // set({
      //   referrals: get().referrals.map((ref) => (ref._id === id ? response.data.referral : ref)),
      // });

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },
}));
