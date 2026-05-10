import express from "express";
import semesterController from "../controllers/semester.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", semesterController.create);
router.get("/", semesterController.findAll);
router.get("/:id", semesterController.findById);
router.put("/:id/status", semesterController.updateStatus);

export default router;
