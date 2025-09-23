import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";

import createTypeObjectiveController from "../controllers/createTypeObjectiveController.js";
import listTypeObjectivesController from "../controllers/listTypeObjectivesController.js";
import updateTypeObjectiveNameController from "../controllers/updateTypeObjectiveNameController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TypeObjectives
 *   description: API para gestionar los tipos de objetivos
 */

/**
 * @swagger
 * /api/v1/kaizenpro/type-objectives/createTypeObjective:
 *   post:
 *     summary: Crea un nuevo tipo de objetivo
 *     description: Genera automáticamente el code y asigna el usuario autenticado como creador.
 *     tags: [TypeObjectives]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del tipo de objetivo
 *     responses:
 *       201:
 *         description: Tipo de objetivo creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 code: 6
 *                 name: "Especifico"
 *                 register_date: "2025-09-23T20:31:27.981Z"
 *       400:
 *         description: Falta el parámetro 'name'
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El parámetro 'name' es requerido"
 *       409:
 *         description: Conflicto, el nombre ya existe
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El nombre 'General' ya está registrado"
 *       500:
 *         description: Error interno del servidor
 */


router.post("/createTypeObjective", authMiddleware.verifyToken, createTypeObjectiveController);

/**
 * @swagger
 * /api/v1/kaizenpro/type-objectives/listAllTypeObjective:
 *   get:
 *     summary: Listar todos los tipos de objetivos
 *     tags: [TypeObjectives]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de objetivos
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - code: 101
 *                   name: "Crecimiento Personal"
 *                   register_date: "2025-09-23T10:00:00.000Z"
 *                 - code: 102
 *                   name: "Habilidades Técnicas"
 *                   register_date: "2025-09-23T10:00:00.000Z"
 *       500:
 *         description: Error interno del servidor
 */
router.get("/listAllTypeObjective", authMiddleware.verifyToken, listTypeObjectivesController);

/**
 * @swagger
 * /api/v1/kaizenpro/type-objectives/updateNameTypeObjective:
 *   patch:
 *     summary: Actualizar el nombre de un tipo de objetivo
 *     tags: [TypeObjectives]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código único del tipo de objetivo
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nuevo nombre del tipo de objetivo
 *     responses:
 *       200:
 *         description: Nombre actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Nombre actualizado correctamente"
 *               data:
 *                 code: 2
 *                 name: "Especifico incial"
 *                 register_date: "2025-09-23T20:03:48.949Z"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Debe proporcionar 'code' y 'name'"
 *       404:
 *         description: Recurso no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "TypeObjective con code 58 no existe"
 *       500:
 *         description: Error interno del servidor
 */

router.patch("/updateNameTypeObjective", authMiddleware.verifyToken, updateTypeObjectiveNameController);

export default router;
