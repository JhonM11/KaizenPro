// src/config/database.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config(); // 👈 carga las variables desde .env

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // requerido por NEON
});

export default pool;
