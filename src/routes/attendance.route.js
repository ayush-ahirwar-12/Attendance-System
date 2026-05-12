import express from "express";
import attendanceController from "../controllers/attendance.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// Existing routes for backward compatibility
router.get("/session/:qrSessionId", attendanceController.getAttendanceBySession);
router.put("/override/:id", attendanceController.overrideStatus);
router.put("/session/:qrSessionId/mark-all", attendanceController.markAllPresent);

// New AttendanceRecord routes
router.post("/markattendance", attendanceController.markAttendance);
router.post("/:sessionId/markmanual", attendanceController.manuallyMarkPresent);
router.post("/records/bulk", attendanceController.bulkCreateRecords);
router.get("/records/session/:sessionId", attendanceController.getRecordsBySession);
router.get("/records/:sessionId/:studentId", attendanceController.getRecord);
router.put("/records/:sessionId/:studentId", attendanceController.upsertRecord);
router.patch("/records/:recordId", attendanceController.updateRecord);
router.post("/records/count-present", attendanceController.countPresentRecords);
router.get("/records/attended/:sessionId", attendanceController.getAttendedStudentIds);

router.get("/getmyattendance/:courseId", attendanceController.getMyAttendance);

export default router;
