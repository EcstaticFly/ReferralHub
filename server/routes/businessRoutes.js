import express from "express";
import { registerUser, loginUser, logoutUser, checkUser } from "../controllers/businessController.js";
import { verifyjwt } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyjwt, logoutUser);
router.get("/check", verifyjwt, checkUser);

export default router;
