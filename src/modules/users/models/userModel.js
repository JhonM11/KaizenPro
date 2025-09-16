// src/modules/users/models/user.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("lider", "admin", "colaborador"),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "users", // 👈 fuerza el nombre exacto de la tabla
    timestamps: false, // desactiva createdAt / updatedAt automáticos
  }
);

export default User;
