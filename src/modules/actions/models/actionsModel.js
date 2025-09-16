// src/models/action.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";
import  Objective  from "../../objectives/models/objectiveModel.js";


export const Action = sequelize.define(
  "action",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    code_improvement: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code_objective: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["P", "D"]], // PENDIENTE o DESARROLLADO
      },
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const raw = this.getDataValue("register_date");
        return raw ? raw.toISOString().replace("T", " ").substring(0, 19) : null;
      },
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const raw = this.getDataValue("final_date");
        return raw ? raw.toISOString().replace("T", " ").substring(0, 19) : null;
      },
    },
    code_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    code_user_completed: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "actions",
    timestamps: false,
  }
);

// 📌 Relaciones
Action.belongsTo(Objective, {
  foreignKey: "code_objective",
  targetKey: "code",
  as: "objective",
});

Objective.hasMany(Action, {
  foreignKey: "code_objective",
  sourceKey: "code",
  as: "actions",
});
