import express from "express";
import RoleController from "../controllers/role.controller.js";
const router = express.Router();

router.post("/createrole",RoleController.createRole);

export default router;

