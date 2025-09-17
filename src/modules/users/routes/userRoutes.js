import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();


// Crear usuario
router.post("/createUser", userController.create);

export default router;
