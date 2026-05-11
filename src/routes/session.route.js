import express from "express";
import sessionController from "../controllers/session.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// Existing session routes
router.post("/generate", sessionController.generateSession);

// AttendanceSession routes
router.post("/attendance", sessionController.createAttendanceSession);
router.get("/attendance/lecture/:lectureId", sessionController.getOpenSessionByLecture);
router.get("/attendance/:sessionId", sessionController.getSessionByTeacher);
router.get("/attendance/qr/:qrToken", sessionController.getSessionByQrToken);
router.patch("/attendance/:sessionId/close", sessionController.closeSession);

export default router;
