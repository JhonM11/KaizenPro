import { getDashboardData } from "../services/dashboardService.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardData();
    res.status(200).json({
      success: true,
      message: "Datos del dashboard obtenidos correctamente",
      data
    });
  } catch (error) {
    next(error);
  }
};
