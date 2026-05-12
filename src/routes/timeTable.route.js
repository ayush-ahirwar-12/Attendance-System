import express from "express";
import timeTableController from "../controllers/timeTable.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", timeTableController.create);
router.get("/semester/:semesterId", timeTableController.findBySemester);
router.get("/semester/:semesterId/raw", timeTableController.findBySemesterRaw);
router.delete("/:id", timeTableController.deleteById);

export default router;
