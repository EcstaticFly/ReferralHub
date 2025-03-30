import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Chat from "../models/chat.js";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const userChatSessions = {};

const greetingPatterns = [
  /^hi$/i,
  /^hello$/i,
  /^hey$/i,
  /^greetings$/i,
  /^howdy$/i,
  /^hi there$/i,
  /^hello there$/i,
  /^good morning$/i,
  /^good afternoon$/i,
  /^good evening$/i,
];

const businessTypeResponses = {
  Retail: [
    "Need help optimizing your in-store referral program?",
    "Looking to boost foot traffic through customer referrals?",
    "Need analytics on which product categories drive the most referrals?",
  ],
  "E-commerce": [
    "Want to increase your online conversion through referrals?",
    "Looking to set up post-purchase referral prompts?",
    "Need help analyzing your referral traffic sources?",
  ],
  Healthcare: [
    "Need a HIPAA-compliant referral system for your practice?",
    "Looking to incentivize patient referrals ethically?",
    "Want to track which services generate the most referrals?",
  ],
  Finance: [
    "Looking to set up a secure referral program for financial clients?",
    "Need compliance-friendly reward options for referrals?",
    "Want analytics on your highest-value referred clients?",
  ],
  Education: [
    "Need help with student ambassador referral programs?",
    "Looking to track enrollment sources through referrals?",
    "Want to set up alumni referral rewards?",
  ],
  Technology: [
    "Need to integrate referrals into your SaaS onboarding?",
    "Looking to analyze user conversion from referred traffic?",
    "Want to set up tiered rewards for high-value software referrals?",
  ],
  "Real Estate": [
    "Need a system to track and reward agent referrals?",
    "Looking to incentivize past clients for property referrals?",
    "Want analytics on which listings generate the most referral interest?",
  ],
  Hospitality: [
    "Need a seamless guest referral program for your property?",
    "Looking to reward guests who bring in event bookings?",
    "Want to analyze which experiences drive the most referrals?",
  ],
  Manufacturing: [
    "Need a B2B referral system for your distribution network?",
    "Looking to track which products generate the most business referrals?",
    "Want to set up tiered rewards for high-volume referred contracts?",
  ],
  Consulting: [
    "Need help setting up a professional referral network?",
    "Looking to track client sources and referral quality?",
    "Want to analyze which services generate the most valuable referrals?",
  ],
};

const defaultBusinessResponses = [
  "How can I help connect your business today?",
  "Looking for specific business partners?",
  "Need help finding connections?",
];

const userTaskInstructions = {
  create_campaign: {
    title: "Creating a New Campaign",

    steps: [
      "Navigate to the sidebar and select 'Campaigns'",
      "Click the 'Create Campaign' button at the top right",
      "Fill in all required campaign details in the form",
      "Set your referral rewards and conditions",
      "Click 'Create Campaign' to activate",
    ],
    additional:
      "You can send campaign emails by clicking the mail icon on any active campaign. To edit a campaign, click the edit icon. To remove a campaign, use the trash icon.",
  },
  view_stats: {
    title: "Viewing Business Analytics",

    steps: [
      "Navigate to the sidebar and select 'Dashboard'",
      "View your key performance metrics at a glance",
    ],
    additional:
      "Campaign-specific analytics can be accessed by clicking on individual campaigns in the Campaigns section.",
  },
  import_customers: {
    title: "Importing Customers",

    steps: [
      "Navigate to the sidebar and select 'Customers'",
      "Click the 'Import Customers' button",
      "Either drag and drop your .CSV file into the designated area or click to browse your files",
      "Ensure your CSV contains the required fields (name, email, etc.)",
      "Map your CSV columns to the correct customer fields if prompted",
      "Click 'Import' to add these customers to your database",
    ],
    additional:
      "Customer-specific analytics and engagement metrics can be viewed in the Customers section after import.",
  },
};

const taskKeywords = {
  create_campaign: [
    "create campaign",
    "new campaign",
    "start campaign",
    "launch campaign",
    "set up campaign",
    "make campaign",
    "begin campaign",
    "initiate campaign",
    "campaign creation",
  ],
  view_stats: [
    "view stats",
    "see statistics",
    "check analytics",
    "view dashboard",
    "business metrics",
    "performance data",
    "campaign results",
    "view results",
    "check performance",
    "analytics dashboard",
    "business stats",
  ],
  import_customers: [
    "import customers",
    "add customers",
    "upload customers",
    "customer import",
    "csv import",
    "add new customers",
    "customer data",
    "upload csv",
    "customer upload",
    "import contacts",
    "add contacts",
  ],
};

const getUserTask = (message) => {
  message = message.toLowerCase();

  for (const [task, keywords] of Object.entries(taskKeywords)) {
    for (const keyword of keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return task;
      }
    }
  }

  return null;
};

const generateTaskInstructions = (task, businessType, userName) => {
  const taskInfo = userTaskInstructions[task];

  if (!taskInfo) {
    return null;
  }

  let response = `${userName}, I'd be happy to guide you through ${taskInfo.title.toLowerCase()} in ReferralHub. `;

  response += `Here's how to proceed:\n\n`;

  taskInfo.steps.forEach((step, index) => {
    response += `${index + 1}. ${step}\n`;
  });

  if (taskInfo.additional) {
    response += `\n${taskInfo.additional}`;
  }

  const businessSpecificTip = getBusinessSpecificTip(task, businessType);
  if (businessSpecificTip) {
    response += `\n\nTip for ${businessType} businesses: ${businessSpecificTip}`;
  }

  response += `\n\nIs there anything specific about ${taskInfo.title.toLowerCase()} you'd like me to elaborate on?`;

  return response;
};

const getBusinessSpecificTip = (task, businessType) => {
  const tips = {
    create_campaign: {
      Retail:
        "Consider creating separate campaigns for in-store vs. online purchases to track channel effectiveness.",
      "E-commerce":
        "Include post-purchase referral prompts in your order confirmation emails for highest conversion.",
      Healthcare:
        "Use secure, HIPAA-compliant messaging templates in your healthcare referral campaigns.",
      Finance:
        "Implement tiered rewards based on the value of referred clients to maximize ROI.",
      Education:
        "Create specific campaigns for different programs or departments to better track enrollment sources.",
      Technology:
        "Integrate your referral campaign with your product onboarding for higher engagement.",
      "Real Estate":
        "Set up agent-specific tracking codes to identify your top referral sources.",
      Hospitality:
        "Create seasonal campaigns aligned with your peak booking periods.",
      Manufacturing:
        "Structure campaigns around specific product lines or distribution channels.",
      Consulting:
        "Create industry-specific referral campaigns to target your ideal client segments.",
    },
    view_stats: {
      Retail:
        "Pay special attention to the store location breakdown in your analytics to optimize local campaigns.",
      "E-commerce":
        "Monitor your channel attribution metrics to identify your most effective referral sources.",
      Healthcare:
        "Track service-specific referral patterns while maintaining patient privacy.",
      Finance:
        "Analyze lifetime value metrics for referred clients compared to non-referred clients.",
      Education:
        "Compare referral effectiveness across different programs and student demographics.",
      Technology:
        "Focus on user activation and retention metrics from referred users vs. other acquisition channels.",
      "Real Estate":
        "Track conversion rates from property inquiries to closed deals for referred clients.",
      Hospitality:
        "Analyze seasonal trends in your referral program to optimize campaign timing.",
      Manufacturing:
        "Monitor the quality of leads from different referral sources based on conversion to contracts.",
      Consulting:
        "Track project scope and value from referred clients to identify your most valuable referrers.",
    },
    import_customers: {
      Retail:
        "Include purchase history and store location in your customer import for better segmentation.",
      "E-commerce":
        "Tag customers with product categories they've purchased to create targeted referral campaigns.",
      Healthcare:
        "Ensure your customer data is anonymized appropriately to maintain HIPAA compliance.",
      Finance:
        "Include client tier or portfolio value in your import for more effective campaign targeting.",
      Education:
        "Tag customers with their program or graduation year for alumni-specific campaigns.",
      Technology:
        "Include product usage metrics in your customer import for better campaign targeting.",
      "Real Estate":
        "Tag customers with property types they've shown interest in for more relevant referrals.",
      Hospitality:
        "Include visit frequency and preferences in your customer import for personalized campaigns.",
      Manufacturing:
        "Tag customers with industry vertical and company size for B2B referral targeting.",
      Consulting:
        "Include service categories in your customer import to create industry-specific referral campaigns.",
    },
  };

  return tips[task]?.[businessType] || null;
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const userName = req.user.name || "valued customer";
    const businessType = req.user.businessType || "business";

    const isGreeting = greetingPatterns.some((pattern) =>
      pattern.test(message.trim())
    );

    if (!userChatSessions[userId]) {
      userChatSessions[userId] = model.startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });

      await Chat.create({
        userId,
        messages: [{ role: "user", content: message }],
      });
    }

    let responseText;

    if (isGreeting) {
      const businessResponses =
        businessTypeResponses[businessType] || defaultBusinessResponses;
      const randomSuggestion =
        businessResponses[Math.floor(Math.random() * businessResponses.length)];

      responseText = `Welcome to ReferralHub, ${userName}! ${randomSuggestion}`;
    } else {
      const taskType = getUserTask(message);

      if (taskType) {
        responseText = generateTaskInstructions(
          taskType,
          businessType,
          userName
        );
      } else {
        const contextualizedMessage = `${message}\n\nKeep your response brief and focused on ${businessType} business needs in the context of referral campaigns and customer analytics.`;

        const chat = userChatSessions[userId];
        const result = await chat.sendMessage(contextualizedMessage);
        const response = result.response;
        responseText = response.text();
      }
    }

    await Chat.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: [
            { role: "user", content: message },
            { role: "assistant", content: responseText },
          ],
        },
        $set: { lastUpdated: new Date() },
      },
      { upsert: true }
    );

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error in chatbot:", error);
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatHistory = await Chat.findOne({ userId });

    if (!chatHistory) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chatHistory.messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    if (userChatSessions[userId]) {
      delete userChatSessions[userId];
    }
    await Chat.findOneAndDelete({ userId });

    res.json({ message: "Chat history cleared successfully" });
  } catch (error) {
    console.error("Error clearing chat history:", error);
    res.status(500).json({ message: "Error clearing chat history" });
  }
};
