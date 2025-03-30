import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Trash,
  Loader,
  MessageCircle,
  Bot
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { chatStore } from "../store/chatStore";
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`
          max-w-[75%] p-3 rounded-lg 
          ${isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-gray-100 dark:bg-gray-700 dark:text-white rounded-tl-none'
          }
        `}
      >
        {isUser ? (
          <div>{message.content}</div>
        ) : (
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <div 
          className={`
            text-xs mt-1
            ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}
          `}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

const Chatbot = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    fetchChatHistory,
    clearChat
  } = chatStore();

  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
      // Focus the input when the chatbot is opened
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, [isOpen, fetchChatHistory]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="
            fixed bottom-24 right-6 
            w-80 sm:w-96 bg-white dark:bg-gray-800 
            rounded-lg shadow-2xl 
            border dark:border-gray-700
            flex flex-col
            max-h-[70vh]
          "
        >
          <div
            className="
              bg-blue-600 text-white 
              p-4 flex justify-between items-center 
              rounded-t-lg
            "
          >
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">Gemini Assistant</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                title="Clear chat history"
                className="hover:bg-blue-700 p-1 rounded-full"
              >
                <Trash size={16} />
              </button>
              <button
                onClick={onClose}
                title="Close chatbot"
                className="hover:bg-blue-700 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <MessageCircle className="mx-auto mb-2" size={32} />
                <p>Start a conversation with your AI assistant</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))
            )}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none">
                  <Loader className="animate-spin text-blue-600 dark:text-blue-400" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="p-3 border-t dark:border-gray-700 flex space-x-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="
                flex-1 p-2 rounded 
                bg-gray-100 dark:bg-gray-700 
                dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="
                bg-blue-600 text-white 
                p-2 rounded 
                hover:bg-blue-700
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;