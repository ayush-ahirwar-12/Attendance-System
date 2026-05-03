import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware..js";
import courseController from "../controllers/course.controller.js";
const router = express.Router();

router.post("/create",authMiddleware,courseController.create);
router.get("/allcourses/:classId",authMiddleware,courseController.fetchCoursesByClassId);
router.get("/teacher",authMiddleware,courseController.fetchCoursesByTeacherId);
router.get("/allcourses",authMiddleware,courseController.getAllCourses);
router.patch("/update/:id",authMiddleware,courseController.updateCourse);
router.delete("/delete/:id",authMiddleware,courseController.deleteCourse);

export default router;