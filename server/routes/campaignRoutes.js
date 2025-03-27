import express from "express";
import { verifyjwt } from "../middlewares/checkAuth.js";
import { createCampaign, getAllCampaigns, updateCampaign, deleteCampaign } from "../controllers/campaignController.js";
const router = express.Router();

router.post("/create", verifyjwt, createCampaign);
router.get("/list/all", verifyjwt, getAllCampaigns);
router.put("/update/:id", verifyjwt, updateCampaign);
router.delete("/:id", verifyjwt, deleteCampaign);


export default router;
