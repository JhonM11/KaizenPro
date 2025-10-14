// src/modules/improvementplan/routes/improvementPlanRoutes.js
import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import createImprovementPlanController from "../controllers/createImprovementPlanController.js";
import listImprovementPlansController from "../controllers/listImprovementPlansController.js";
import finalizeImprovementPlanController from "../controllers/finalizeImprovementPlanController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ImprovementPlans
 *   description: API para gestionar los planes de mejora (creación, listado y finalización)
 */



/**
 * @swagger
 * /api/v1/kaizenpro/improvementplan/createImprovementPlan:
 *   post:
 *     summary: Crea un nuevo plan de mejora
 *     description: Registra un nuevo plan de mejora asociado a un timeframe y al usuario autenticado. La fecha final no se envía, ya que se asigna automáticamente al finalizar el plan.
 *     tags: [ImprovementPlans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - comment
 *               - state_improvement
 *               - code_timeframes
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mejorar eficiencia de procesos"
 *               description:
 *                 type: string
 *                 example: "Reducir el tiempo de respuesta de solicitudes internas"
 *               comment:
 *                 type: string
 *                 example: "Plan creado tras análisis de indicadores"
 *               code_timeframes:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Plan de mejora creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 code: 3
 *                 title: "Mejorar eficiencia de procesos"
 *                 description: "Reducir el tiempo de respuesta de solicitudes internas"
 *                 comment: "Plan creado tras análisis de indicadores"
 *                 state_improvement: "P"
 *                 register_date_create: "2025-10-14T13:50:14.691Z"
 *                 final_date: null
 *                 code_user: "643c2fb6-3589-4295-9e42-69f91fad5c9d"
 *                 code_timeframes: 3
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "title es requerido"
 *       404:
 *         description: No existe el timeframe asociado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "No existe un timeframe con code 3"
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/createImprovementPlan",
  authMiddleware.verifyToken,
  createImprovementPlanController
);

/**
 * @swagger
 * /api/v1/kaizenpro/improvementplan/listImprovementPlans:
 *   get:
 *     summary: Lista todos los planes de mejora
 *     description: Devuelve todos los planes de mejora con información del usuario y el periodo asociado.
 *     tags: [ImprovementPlans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planes de mejora
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - code: 1
 *                   title: "Plan de Mejora A"
 *                   description: "Descripción del plan A"
 *                   comment: "Comentario del plan"
 *                   state_improvement: "P"
 *                   register_date_create: "2025-09-10T00:00:00.000Z"
 *                   final_date: null
 *                   code_user: "uuid-user"
 *                   code_timeframes: 2
 *                   timeframe:
 *                     code: 2
 *                     name: "Periodo proyecto - MIRANDA"
 *                   user:
 *                     code: "643c2fb6-3589-4295-9e42-69f91fad5c9d"
 *                     username: "jhon12345"
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/listImprovementPlans",
  authMiddleware.verifyToken,
  listImprovementPlansController
);

/**
 * @swagger
 * /api/v1/kaizenpro/improvementplan/finalizeImprovementPlan:
 *   patch:
 *     summary: Finaliza un plan de mejora
 *     description: Cambia el estado del plan a **F (Finalizado)** y asigna la fecha actual como `final_date`.
 *     tags: [ImprovementPlans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código del plan de mejora a finalizar
 *         example: 4
 *     responses:
 *       200:
 *         description: Plan de mejora finalizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Plan de mejora \"Mejorar eficiencia de procesos 4\" se ha finalizado correctamente"
 *       400:
 *         description: Código no proporcionado o inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Debe enviar el código del plan a finalizar"
 *       404:
 *         description: No se encontró el plan de mejora
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "No existe un plan de mejora con el código 4"
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/finalizeImprovementPlan",
  authMiddleware.verifyToken,
  finalizeImprovementPlanController
);

export default router;
