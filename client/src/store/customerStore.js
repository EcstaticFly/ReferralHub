import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const customerStore = create((set) => ({
  customers: [],
  isLoading: false,
  isImporting: false,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/customer/list");
      set({ customers: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customers");
    } finally {
      set({ isLoading: false });
    }
  },

  importCustomers: async (fileData) => {
    set({ isImporting: true });
    try {
      const formData = new FormData();
      formData.append("file", fileData);
      const response = await axiosInstance.post("/customer/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      // Optionally, re-fetch customers after a successful import
      await get().fetchCustomers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to import customers");
    } finally {
      set({ isImporting: false });
    }
  },
}));
