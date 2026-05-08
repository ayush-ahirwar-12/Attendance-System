import express from "express";
import enrollmentController from "../controllers/enrollment.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

// Enroll student to class/course
router.post("/", enrollmentController.enrollStudent);

// Get enrolled students by course
router.get("/course/:courseId", enrollmentController.getEnrolledStudents);

// Get student's enrollments
router.get("/student/my-enrollments", enrollmentController.getStudentEnrollments);

// Get class enrollments
router.get("/class/:classId", enrollmentController.getClassEnrollments);

// Get all enrollments
router.get("/", enrollmentController.getAllEnrollments);

// Update enrollment status
router.put("/:id", enrollmentController.updateEnrollmentStatus);

// Delete enrollment
router.delete("/:id", enrollmentController.deleteEnrollment);

export default router;
