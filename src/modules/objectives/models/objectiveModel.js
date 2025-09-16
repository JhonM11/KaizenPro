// src/modules/objectives/models/objective.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";

import ImprovementPlan from "../../improvemenplan/models/improvemenplanModel.js";
import TypeObjective from "../../type_objectives/models/type_objectiveModel.js";

const Objective = sequelize.define(
  "Objective",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    code_improvement: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["P", "D"]], // P: Pendiente, D: Desarrollado
      },
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    code_user_completed: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "objectives",
    timestamps: false,
  }
);

/**
 * 🔗 Relaciones
 * - code_improvement → ImprovementPlan.code (1:N)
 * - code_type → TypeObjective.code (N:1)
 */
Objective.belongsTo(ImprovementPlan, {
  foreignKey: "code_improvement",
  targetKey: "code",
  as: "improvementPlan",
});

Objective.belongsTo(TypeObjective, {
  foreignKey: "code_type",
  targetKey: "code",
  as: "typeObjective",
});

export default Objective;
