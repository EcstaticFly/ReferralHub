import express from "express";
import { verifyjwt } from "../middlewares/checkAuth.js";
import { sendReferralBulk, getReferrals } from "../controllers/referralController.js";

const router = express.Router();

router.post("/send", verifyjwt, sendReferralBulk);
router.get("/list", verifyjwt, getReferrals);
router.put("/update/:id", verifyjwt, updateReferralStatus);
router.post("/send-bulk", verifyjwt, sendReferralBulk);


export default router;
