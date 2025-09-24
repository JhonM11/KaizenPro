// src/modules/timeframes/models/timeframe.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";

const Timeframe = sequelize.define(
  "Timeframe",
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    extension_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    code_user_register: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "timeframes", //  asegura el nombre exacto de la tabla
    timestamps: false, // no usaremos createdAt/updatedAt automáticos
  }
);

export default Timeframe;
