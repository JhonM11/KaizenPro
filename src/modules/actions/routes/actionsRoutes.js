import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import createActionController from "../controllers/createActionController.js";
import listActionsController from "../controllers/listActionsController.js";
import finalizeActionController from "../controllers/finalizeActionController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Actions
 *   description: Gestión de acciones asociadas a los objetivos.
 */

/**
 * @swagger
 * /api/v1/kaizenpro/actions/listActions:
 *   get:
 *     summary: Listar todas las acciones
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de acciones obtenida correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - code: 2
 *                   title: "Capacitar al personal en nuevas estrategias de calidad"
 *                   description: "Realizar un taller de dos días sobre implementación de estrategias de calidad y mejora continua."
 *                   state: "P"
 *                   register_date: "2025-10-16 15:18:54"
 *                   final_date: null
 *                   code_improvement: 3
 *                   code_objective: 1
 *                   code_user: "643c2fb6-3589-4295-9e42-69f91fad5c9d"
 *                   code_user_completed: null
 *                   objective:
 *                     code: 1
 *                     body: "Implementar nuevas estrategias de calidad"
 *                     state: "D"
 */
router.get("/listActions", authMiddleware.verifyToken, listActionsController);

/**
 * @swagger
 * /api/v1/kaizenpro/actions/createAction:
 *   post:
 *     summary: Crear una nueva acción
 *     tags: [Actions]
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
 *               - code_objective
 *               - title
 *               - description
 *             properties:
 *               code_improvement:
 *                 type: integer
 *                 example: 3
 *               code_objective:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Capacitar al personal en nuevas estrategias de calidad"
 *               description:
 *                 type: string
 *                 example: "Realizar un taller de dos días sobre implementación de estrategias de calidad y mejora continua."
 *     responses:
 *       201:
 *         description: Acción creada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Acción 'Capacitar al personal en nuevas estrategias de calidad' creada correctamente"
 *       400:
 *         description: Error de validación en los campos enviados.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "El campo 'code_objective' es obligatorio."
 *       424:
 *         description: Dependencia no encontrada (plan o recurso inexistente).
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "No existe un plan de mejora con code 96"
 */
router.post("/createAction", authMiddleware.verifyToken, createActionController);

/**
 * @swagger
 * /api/v1/kaizenpro/actions/finalize:
 *   patch:
 *     summary: Finalizar una acción existente
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código de la acción que se desea finalizar.
 *     responses:
 *       200:
 *         description: Acción finalizada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Acción 4 finalizada correctamente."
 *       400:
 *         description: No se encontró la acción o el código es inválido.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "La acción con código 5 no existe."
 *       409:
 *         description: La acción ya se encontraba finalizada.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "La acción con código 5 ya está finalizada."
 */
router.patch("/finalize", authMiddleware.verifyToken, finalizeActionController);

export default router;
