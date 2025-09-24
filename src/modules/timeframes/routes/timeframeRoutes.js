// src/modules/timeframes/routes/timeframeRoutes.js
import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware.js";

import createTimeframeController from "../controllers/createTimeframeController.js";
import listTimeframesController from "../controllers/listTimeframesController.js";
import updateTimeframeNameController from "../controllers/updateTimeframeNameController.js";
import updateTimeframeExtensionDateController from "../controllers/updateTimeframeExtensionDateController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Timeframes
 *   description: API para gestionar los periodos de tiempo
 */

/**
 * @swagger
 * /api/v1/kaizenpro/timeframes/createTimeframe:
 *   post:
 *     summary: Crea un nuevo periodo de tiempo
 *     description: Genera un nuevo timeframe autoincrementando el code y asignando el usuario en sesión como registrador.
 *     tags: [Timeframes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Periodo Académico 2025-1"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-15"
 *               final_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *     responses:
 *       201:
 *         description: Periodo de tiempo creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 code: 5
 *                 name: "Periodo Académico 2025-1"
 *                 start_date: "2025-01-15T00:00:00.000Z"
 *                 final_date: "2025-06-30T00:00:00.000Z"
 *                 extension_date: null
 *       400:
 *         description: Faltan parámetros requeridos o fechas inválidas
 *         content:
 *           application/json:
 *             example: { success: false, message: "start_date debe ser anterior a final_date" }
 *       500:
 *         description: Error interno del servidor
 */
router.post("/createTimeframe", authMiddleware.verifyToken, createTimeframeController);

/**
 * @swagger
 * /api/v1/kaizenpro/timeframes/listTimeframes:
 *   get:
 *     summary: Lista todos los periodos de tiempo
 *     tags: [Timeframes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de periodos de tiempo
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - code: 1
 *                   name: "Periodo 2024-2"
 *                   start_date: "2024-07-01T00:00:00.000Z"
 *                   final_date: "2024-12-15T00:00:00.000Z"
 *                   extension_date: null
 *                 - code: 2
 *                   name: "Periodo 2025-1"
 *                   start_date: "2025-01-15T00:00:00.000Z"
 *                   final_date: "2025-06-30T00:00:00.000Z"
 *                   extension_date: "2025-07-15T00:00:00.000Z"
 *       500:
 *         description: Error interno del servidor
 */
router.get("/listTimeframes", authMiddleware.verifyToken, listTimeframesController);

/**
 * @swagger
 * /api/v1/kaizenpro/timeframes/updateTimeframeName:
 *   patch:
 *     summary: Actualiza el nombre de un periodo de tiempo
 *     tags: [Timeframes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código único del periodo
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nuevo nombre para el periodo
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
 *                 name: "Periodo 2025-1 Modificado"
 *                 start_date: "2025-01-15T00:00:00.000Z"
 *                 final_date: "2025-06-30T00:00:00.000Z"
 *                 extension_date: null
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             example: { success: false, message: "Debe proporcionar 'code' y 'name'" }
 *       404:
 *         description: Periodo no encontrado
 *         content:
 *           application/json:
 *             example: { success: false, message: "Timeframe con code 99 no existe" }
 */
router.patch("/updateTimeframeName", authMiddleware.verifyToken, updateTimeframeNameController);

/**
 * @swagger
 * /api/v1/kaizenpro/timeframes/updateTimeframeExtensionDate:
 *   patch:
 *     summary: Actualiza la fecha de extensión de un periodo de tiempo
 *     tags: [Timeframes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código único del periodo
 *       - in: query
 *         name: extension_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Nueva fecha de extensión
 *     responses:
 *       200:
 *         description: Fecha de extensión actualizada correctamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Fecha de extensión actualizada correctamente"
 *               data:
 *                 code: 2
 *                 name: "Periodo 2025-1"
 *                 start_date: "2025-01-15T00:00:00.000Z"
 *                 final_date: "2025-06-30T00:00:00.000Z"
 *                 extension_date: "2025-07-15T00:00:00.000Z"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             example: { success: false, message: "Debe proporcionar 'code' y 'extension_date'" }
 *       404:
 *         description: Periodo no encontrado
 *         content:
 *           application/json:
 *             example: { success: false, message: "Timeframe con code 77 no existe" }
 */
router.patch("/updateTimeframeExtensionDate", authMiddleware.verifyToken, updateTimeframeExtensionDateController);

export default router;
