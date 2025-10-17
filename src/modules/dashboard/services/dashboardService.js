import sequelize from "../../../config/sequelize.js";

export const getDashboardData = async () => {
  try {
    const [improvementData] = await sequelize.query(`
      SELECT 'Total de planes' as concepto, count(*) as cantidad FROM improvemenplan
      UNION ALL
      SELECT 'Total de planes Pendientes' as concepto, count(*) as cantidad FROM improvemenplan WHERE state_improvement = 'P'
      UNION ALL
      SELECT 'Total de planes Finalizados' as concepto, count(*) as cantidad FROM improvemenplan WHERE state_improvement = 'F'
    `);

    const [objectivesData] = await sequelize.query(`
      SELECT 'Total de Objetivos' as concepto, count(*) as cantidad FROM objectives
      UNION ALL
      SELECT 'Total de Objetivos Pendientes' as concepto, count(*) as cantidad FROM objectives WHERE state = 'P'
      UNION ALL
      SELECT 'Total de Objetivos Desarrollados' as concepto, count(*) as cantidad FROM objectives WHERE state = 'D'
    `);

    const [actionsData] = await sequelize.query(`
      SELECT 'Total de Acciones' as concepto, count(*) as cantidad FROM actions
      UNION ALL
      SELECT 'Total de Acciones Pendientes' as concepto, count(*) as cantidad FROM actions WHERE state = 'P'
      UNION ALL
      SELECT 'Total de Acciones Desarrolladas' as concepto, count(*) as cantidad FROM actions WHERE state = 'D'
    `);

    return { improvementData, objectivesData, actionsData };
  } catch (error) {
    console.error("❌ Error al obtener datos del dashboard:", error);
    throw error;
  }
};
