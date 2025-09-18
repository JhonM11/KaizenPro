import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();


/**
 * @swagger
 * /api/v1/kaizenpro/user/createUser:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Endpoint para registrar un nuevo usuario en el sistema.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *               - mail
 *             properties:
 *               username:
 *                 type: string
 *                 example: prueba123
 *               role:
 *                 type: string
 *                 example: lider
 *               mail:
 *                 type: string
 *                 example: prueba@example.com
 *               phone:
 *                 type: string
 *                 example: "3002556969"
 *               state:
 *                 type: string
 *                 example: A
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Usuario creado con éxito"
 *               user:
 *                 username: "User123"
 *                 role: "lider"
 *                 register_date: "2025-09-18T16:31:36.451Z"
 *       400:
 *         description: Petición inválida (faltan campos obligatorios)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "username, role y mail son requeridos"
 *       403:
 *         description: Acceso prohibido
 *         content:
 *           application/json:
 *             example:
 *               message: "No autorizado"
 *       409:
 *         description: Conflicto de datos (usuario ya existe)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El usuario 'User123' ya existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */


// Crear usuario
router.post("/createUser", userController.create);

export default router;
