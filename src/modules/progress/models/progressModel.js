// src/models/progressModel.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";


export const Progress = sequelize.define(
  "progress",
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
    code_action: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const raw = this.getDataValue("register_date");
        return raw ? raw.toISOString().replace("T", " ").substring(0, 19) : null;
      },
    },
  },
  {
    tableName: "progress",
    timestamps: false,
  }
);

