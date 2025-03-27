import express from "express";
import { verifyjwt } from "../middlewares/checkAuth.js";
import { sendReferralBulk, getReferrals, updateReferralStatus } from "../controllers/referralController.js";

const router = express.Router();

router.get("/list", verifyjwt, getReferrals);
router.put("/update/:id", verifyjwt, updateReferralStatus);
router.post("/send-bulk", verifyjwt, sendReferralBulk);


export default router;
