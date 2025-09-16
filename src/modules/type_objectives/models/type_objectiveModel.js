// src/modules/type_objectives/models/type_objective.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";

const TypeObjective = sequelize.define(
  "TypeObjective",
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
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    code_user_create: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "type_objectives",
    timestamps: false,
  }
);

export default TypeObjective;
