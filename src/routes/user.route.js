import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";

router.put("/:id/role",authMiddleware,userController.updateUserRole);

export default router;
