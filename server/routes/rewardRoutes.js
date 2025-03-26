import express from "express";
import { verifyjwt } from "../middlewares/checkAuth.js";
import { issueReward } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/issue", verifyjwt, issueReward);

export default router;
