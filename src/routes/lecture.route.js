import express from "express";
import lectureController from "../controllers/lecture.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// Lecture Repository routes
router.post("/bulk", lectureController.bulkCreateLectures);
router.post("/", lectureController.createLecture);
router.get("/teacher/:teacherId/today", lectureController.getTodayLectures);
router.get("/teacher/:teacherId/week", lectureController.getWeekLectures);
router.get("/:id", lectureController.getLectureById);
router.get("/:id/with-class", lectureController.getLectureWithClass);
router.get("/teacher/:teacherId/:lectureId", lectureController.getLectureByTeacherAndId);
router.get("/teacher/:teacherId/:lectureId/scheduled", lectureController.getScheduledLecture);
router.get("/course/:courseId/completed", lectureController.getCompletedLectures);
router.patch("/:id/topic", lectureController.updateTopic);
router.patch("/:id/status", lectureController.updateStatus);
router.patch("/:id/cancel", lectureController.cancelLecture);

// LectureRequest routes
router.post("/request", lectureController.createLectureRequest);
router.get("/requests/pending", lectureController.getPendingLectureRequests);
router.get("/requests/teacher/:teacherId", lectureController.getLectureRequestsByTeacher);
router.get("/requests/:id", lectureController.getLectureRequestById);
router.put("/requests/:id/status", lectureController.updateLectureRequestStatus);

export default router;
