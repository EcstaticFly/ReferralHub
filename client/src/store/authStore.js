import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import {toast} from "react-toastify";

export const authStore = create((set, get) => ({
  user: null,
  isLoggingIn: false,
  isLoading: true,
  isSendingMessage: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/business/check");
      set({ user: response.data });
    } catch (error) {
      console.log(error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (formData) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/business/register", formData);
      set({ user: response.data.business });
      toast.success(response.data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/business/login", formData);
      set({ user: response.data.business });
      toast.success(response.data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/business/logout");
      toast.success(response.data.message);
      set({ user: null });

    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  },
}));
