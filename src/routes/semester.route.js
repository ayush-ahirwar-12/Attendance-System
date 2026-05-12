import express from "express";
import semesterController from "../controllers/semester.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", semesterController.create);
router.get("/getallsemester", semesterController.findAll);
// router.get("/:id", semesterController.findById);
router.patch("/update/:id", semesterController.updateStatus);

export default router;
