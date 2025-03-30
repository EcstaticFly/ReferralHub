// chatStore.js
import { create } from "zustand";
import { axiosInstance } from "../configs/axios.js";
import { toast } from "react-toastify";

export const chatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchChatHistory: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/chat/history");
      set({ messages: response.data.messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      set({ error: "Failed to load chat history" });
      toast.error("Failed to load chat history");
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (messageText) => {
    const userMessage = { role: "user", content: messageText, timestamp: new Date() };
    set(state => ({ 
      messages: [...state.messages, userMessage],
      isLoading: true 
    }));

    try {
      const response = await axiosInstance.post("/chat/send", { message: messageText });

      const botMessage = { 
        role: "assistant", 
        content: response.data.response, 
        timestamp: new Date() 
      };
      
      set(state => ({ 
        messages: [...state.messages, botMessage],
        isLoading: false
      }));
      
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      set(state => ({ 
        error: "Failed to send message",
        isLoading: false 
      }));
      toast.error("Failed to send message");
      return false;
    }
  },
  
  clearChat: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete("/chat/clear");
      set({ messages: [] });
      toast.success("Chat history cleared");
    } catch (error) {
      console.error("Error clearing chat:", error);
      set({ error: "Failed to clear chat history" });
      toast.error("Failed to clear chat history");
    } finally {
      set({ isLoading: false });
    }
  },

  getSuggestion: async (campaignName, campaignDescription, rewardType, rewardValue, message) => {
    try {
      const response = await axiosInstance.post("/chat/campaign-suggestion", {
        campaignName,
        campaignDescription,
        rewardType,
        rewardValue,
        message
      });
      return response.data.response;
    } catch (error) {
      console.error("Error getting suggestion:", error);
      toast.error("Failed to get suggestion");
      return null;
    }
  }
}));