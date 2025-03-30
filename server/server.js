import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './configs/mongoDB.js'

import businessRoutes from "./routes/businessRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({limit:"5mb", extended:true}));

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use("/api/business", businessRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reward", rewardRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
  connectDB();
});
