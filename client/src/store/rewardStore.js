import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const rewardStore = create((set) => ({
  rewards: [],
  isIssuing: false,

  issueReward: async (rewardData) => {
    set({ isIssuing: true });
    try {
      const response = await axiosInstance.post("/reward/issue", rewardData);
      toast.success(response.data.message);
      // Optionally, add reward to the state
      set((state) => ({ rewards: [...state.rewards, response.data.reward] }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to issue reward");
    } finally {
      set({ isIssuing: false });
    }
  },

  // Optionally, add methods to fetch rewards if needed
}));
