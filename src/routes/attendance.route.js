import express from "express";
import attendanceController from "../controllers/attendance.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

router.get("/session/:qrSessionId", attendanceController.getAttendanceBySession);
router.put("/override/:id", attendanceController.overrideStatus);
router.put("/session/:qrSessionId/mark-all", attendanceController.markAllPresent);

export default router;
