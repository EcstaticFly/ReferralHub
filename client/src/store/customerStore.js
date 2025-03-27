import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const customerStore = create((set, get) => ({
  customers: [],
  totalRewards: 0,
  isLoading: false,
  isImporting: false,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/customer/list");
      set({ customers: response.data.customers, totalRewards: response.data.totalRewards });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customers");
    } finally {
      set({ isLoading: false });
    }
  },

  importCustomers: async (formData) => {
    set({ isImporting: true });
    try {
      // Optional: log entries to verify formData content
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const response = await axiosInstance.post("/customer/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      await get().fetchCustomers();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isImporting: false });
    }
  },
}));
