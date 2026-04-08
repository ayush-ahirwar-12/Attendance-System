import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware..js";
import classController from "../controllers/class.controller.js";
const router = express.Router();

router.post("/create",authMiddleware,classController.createClass)
router.get("/getallclassofuser",authMiddleware,classController.getAllClassOfUser);
router.get("/getclass/:classId",authMiddleware,classController.getClass);
router.get("/getallclass",authMiddleware,classController.getAllClass);


export default router;