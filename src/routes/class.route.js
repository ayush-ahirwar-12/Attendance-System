import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.";
import classController from "../controllers/class.controller";
const router = express.Router();

router.post("/create",authMiddleware,classController.createClass);

export default router;