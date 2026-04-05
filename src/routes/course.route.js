import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware..js";
import courseController from "../controllers/course.controller.js";
const router = express.Router();

router.post("/create",authMiddleware,courseController.create);
router.get("/allcourses/:classId",authMiddleware,courseController.fetchCoursesByClassId);

export default router;