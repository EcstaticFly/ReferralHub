import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import {verifyjwt} from "../middlewares/checkAuth.js"

const router = express.Router();

router.get("/", verifyjwt, getDashboardStats);

export default router;
