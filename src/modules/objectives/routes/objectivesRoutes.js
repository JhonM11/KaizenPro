// src/modules/objectives/routes/objectivesRoutes.js
import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import createObjectiveController from "../controllers/createObjectiveController.js";
import listObjectivesController from "../controllers/listObjectivesController.js";
import finalizeObjectiveController from "../controllers/finalizeObjectiveController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Objectives
 *   description: Gestión de objetivos asociados a los planes de mejora.
 */

/**
 * @swagger
 * /api/v1/kaizenpro/objectives/listObjectives:
 *   get:
 *     summary: Listar todos los objetivos registrados
 *     description: Retorna una lista completa de los objetivos con su información relacionada (plan de mejora y tipo de objetivo).
 *     tags: [Objectives]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de objetivos obtenida correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - code: 1
 *                   body: "Implementar nuevas estrategias de calidad"
 *                   state: "D"
 *                   register_date: "2025-10-14T16:30:54.821Z"
 *                   final_date: "2025-10-14T16:38:44.600Z"
 *                   code_improvement: 5
 *                   code_type: 5
 *                   code_user_create: "643c2fb6-3589-4295-9e42-69f91fad5c9d"
 *                   code_user_completed: "643c2fb6-3589-4295-9e42-69f91fad5c9d"
 *                   improvementPlan:
 *                     code: 5
 *                     title: "Mejorar eficiencia de procesos 4"
 *                   typeObjective:
 *                     code: 5
 *                     name: "General"
 *       401:
 *         description: Token de autenticación no válido o ausente.
 */
router.get("/listObjectives", authMiddleware.verifyToken, listObjectivesController);

/**
 * @swagger
 * /api/v1/kaizenpro/objectives/createObjective:
 *   post:
 *     summary: Crear un nuevo objetivo
 *     description: Permite registrar un nuevo objetivo asociado a un plan de mejora y tipo de objetivo.
 *     tags: [Objectives]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code_improvement
 *               - code_type
 *               - body
 *             properties:
 *               code_improvement:
 *                 type: integer
 *                 example: 3
 *               code_type:
 *                 type: integer
 *                 example: 2
 *               body:
 *                 type: string
 *                 example: "Implementar nuevas estrategias de calidad"
 *     responses:
 *       201:
 *         description: Objetivo creado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Objetivo 'Implementar nuevas estrategias de calidad x2x' creado correctamente"
 *       400:
 *         description: Datos inválidos o referencias inexistentes.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "No existe un plan de mejora con code 85"
 *       401:
 *         description: Token de autenticación no válido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/createObjective", authMiddleware.verifyToken, createObjectiveController);

/**
 * @swagger
 * /api/v1/kaizenpro/objectives/finalize:
 *   patch:
 *     summary: Finalizar un objetivo
 *     description: Marca un objetivo como finalizado (estado "D"). Solo se puede finalizar si el objetivo está pendiente.
 *     tags: [Objectives]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código del objetivo a finalizar.
 *     responses:
 *       200:
 *         description: Objetivo finalizado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Objetivo 2 finalizado correctamente."
 *       400:
 *         description: Solicitud inválida (por ejemplo, el código no existe).
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El objetivo con código 99 no existe."
 *       409:
 *         description: El objetivo ya se encuentra finalizado.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El objetivo con código 1 ya está finalizado."
 *       401:
 *         description: Token de autenticación no válido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/finalize", authMiddleware.verifyToken, finalizeObjectiveController);

export default router;
