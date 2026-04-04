import express from "express";
import qrController from "../controllers/qr.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";
const router = express.Router();

router.post("/generate",authMiddleware,qrController.generateQr);

export default router;