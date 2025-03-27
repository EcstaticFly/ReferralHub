import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const dashboardStore = create((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/dashboard/");
      set({ stats: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch dashboard stats");
    } finally {
      set({ isLoading: false });
    }
  },
}));
