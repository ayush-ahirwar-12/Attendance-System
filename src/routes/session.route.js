import express from "express";
import sessionController from "../controllers/session.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// AttendanceSession routes
router.post("/start", sessionController.createAttendanceSession);
router.get("/attendance/lecture/:lectureId", sessionController.getOpenSessionByLecture);
router.get("/:sessionId", sessionController.getSessionByTeacher);
router.get("/attendance/qr/:qrToken", sessionController.getSessionByQrToken);
router.post("/:sessionId/close", sessionController.closeSession);

export default router;
