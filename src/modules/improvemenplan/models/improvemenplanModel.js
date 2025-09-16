// src/modules/improvementplan/models/improvementplan.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";
import User from "../../users/models/userModel.js";
import Timeframe from "../../timeframes/models/timeframesModel.js";

const ImprovementPlan = sequelize.define(
  "ImprovementPlan",
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state_improvement: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["P", "D"]], // P: Pendiente, D: Desarrollado
      },
    },
    register_date_create: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    code_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    code_timeframes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "improvemenplan",
    timestamps: false,
  }
);

/**
 * 🔗 Relaciones
 * - code_timeframes (1:1 con Timeframe)
 * - code_user (N:1 con User)
 */

// ImprovementPlan pertenece a un Timeframe (1:1 por el campo "code_timeframes" → "code")
ImprovementPlan.belongsTo(Timeframe, {
  foreignKey: "code_timeframes",
  targetKey: "code",
  as: "timeframe",
});

// ImprovementPlan pertenece a un User (N:1 por el campo "code_user" → "code")
ImprovementPlan.belongsTo(User, {
  foreignKey: "code_user",
  targetKey: "code",
  as: "user",
});

export default ImprovementPlan;
