import express from "express";
import { register, login } from "../controllers/businessController.js";
import { verifyjwt } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", verifyjwt, checkUser);

export default router;
