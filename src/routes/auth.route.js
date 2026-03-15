import express from "express";
import authController from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware..js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();


router.post("/register",authController.register);

router.post("/login",authController.login);

router.patch("/user-verification/:id",authMiddleware,authController.update);

router.post("/logout",authMiddleware,authController.logout);

export default router;
