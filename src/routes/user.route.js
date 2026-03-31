import express from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware..js";
const router = express.Router();

router.put("/:id/role",authMiddleware,userController.updateUserRole);

router.patch("/updateuser",authMiddleware,userController.updateUser
)

export default router;
