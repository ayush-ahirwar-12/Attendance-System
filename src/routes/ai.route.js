import express from 'express';
import aiController from '../controllers/ai.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware..js';
const router = express.Router();

router.post('/analyze/:resumeId',authMiddleware,aiController.analyzeResumeAI);

export default router;