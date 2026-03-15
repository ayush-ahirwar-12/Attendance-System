import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware..js";
import resumeController from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/upload-url",authMiddleware,resumeController.getUploadUrl);
router.post("/save",authMiddleware,resumeController.saveResumeMetaData);
router.post("/extract/:resumeId", authMiddleware, resumeController.extractResumeText);

export default router;