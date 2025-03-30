// chatRoutes.js
import express from "express";
import { sendMessage, getChatHistory, clearChatHistory } from "../controllers/chatController.js";
import { verifyjwt } from "../middlewares/checkAuth.js";

const router = express.Router();

router.use(verifyjwt);

router.post("/send", sendMessage);
router.get("/history", getChatHistory);
router.delete("/clear", clearChatHistory);

export default router;