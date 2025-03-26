import express from "express";
import { verifyjwt } from "../middlewares/checkAuth.js";
import { importCustomers, getCustomers } from "../controllers/customerController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/import", verifyjwt, upload.single("file"), importCustomers);
router.get("/list", verifyjwt, getCustomers);

export default router;
