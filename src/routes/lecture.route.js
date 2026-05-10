import express from "express";
import lectureController from "../controllers/lecture.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// Existing lecture routes
router.post("/", lectureController.create);

// LectureRequest routes
router.post("/request", lectureController.createLectureRequest);
router.get("/requests/pending", lectureController.getPendingLectureRequests);
router.get("/requests/teacher/:teacherId", lectureController.getLectureRequestsByTeacher);
router.get("/requests/:id", lectureController.getLectureRequestById);
router.put("/requests/:id/status", lectureController.updateLectureRequestStatus);

export default router;
