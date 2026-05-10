import express from "express";
import holidayController from "../controllers/holiday.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", holidayController.create);
router.get("/semester/:semesterId", holidayController.findBySemester);
router.get("/semester/:semesterId/date-strings", holidayController.getHolidayDateStrings);
router.delete("/:id", holidayController.deleteById);

export default router;
