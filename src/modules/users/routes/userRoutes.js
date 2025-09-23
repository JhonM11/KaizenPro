import { Router } from "express";
import userController from "../controllers/userController.js";
import listUsersController from "../controllers/listUsersController.js";
import deleteUserController from "../controllers/deleteUserController.js";
import updateUserStateController from "../controllers/updateUserStateController.js";
import getUserContextController from "../controllers/getUserContextController.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";

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


/**
 * @swagger
 * /api/v1/kaizenpro/user/list:
 *   get:
 *     summary: Lista todos los usuarios
 *     description: Devuelve un listado de todos los usuarios registrados en el sistema.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               total: 2
 *               users:
 *                 - code: "f93c4e12-7e11-4e94-bc2e-1c1cbb45e003"
 *                   username: "User123"
 *                   role: "lider"
 *                   state: "A"
 *                   mail: "user123@example.com"
 *                   phone: "3001234567"
 *                 - code: "a14c2d2a-01ad-4f7c-ae02-7f25ab998f01"
 *                   username: "User456"
 *                   role: "colaborador"
 *                   state: "I"
 *                   mail: "user456@example.com"
 *                   phone: "3019876543"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */
router.get("/list", listUsersController);

/**
 * @swagger
 * /api/v1/kaizenpro/user/delete:
 *   delete:
 *     summary: Elimina un usuario por code
 *     description: Elimina un usuario existente en base a su código único (UUID).
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código UUID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Usuario con code f93c4e12-7e11-4e94-bc2e-1c1cbb45e003 eliminado correctamente"
 *       400:
 *         description: Parámetro faltante o inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El parámetro 'code' es requerido"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Usuario con code 'xxx' no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */
router.delete("/delete", deleteUserController);


/**
 * @swagger
 * /api/v1/kaizenpro/user/state:
 *   patch:
 *     summary: Actualiza el estado de un usuario
 *     description: Permite activar (A) o inactivar (I) un usuario según su código.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código UUID del usuario
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *           enum: [A, I]
 *         description: Estado a asignar (A = Activo, I = Inactivo)
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Estado del usuario actualizado a 'I'"
 *               user:
 *                 code: "f93c4e12-7e11-4e94-bc2e-1c1cbb45e003"
 *                 username: "User123"
 *                 state: "I"
 *       400:
 *         description: Petición inválida (faltan parámetros o estado incorrecto)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El estado debe ser 'A' (Activo) o 'I' (Inactivo)"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Usuario con code 'xxx' no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */
router.patch("/state", updateUserStateController);

/**
 * @swagger
 * /api/v1/kaizenpro/user/context:
 *   get:
 *     summary: Obtiene el contexto del usuario autenticado
 *     description: Retorna la información del usuario en sesión basada en el token JWT.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 code: "03d89745-3dec-4723-83dc-f21bcdfa252d"
 *                 username: "juanpa"
 *                 role: "lider"
 *                 mail: "lider@example.com"
 *                 phone: "25689571"
 *       401:
 *         description: Usuario no autenticado o token inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token inválido o expirado"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "No se encontró información del usuario"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error interno del servidor"
 */
router.get("/context", authMiddleware.verifyToken, getUserContextController);


export default router;
