const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL en Render con variables separadas
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Render necesita SSL
});


// Endpoint raíz (prueba)
app.get("/", (req, res) => {
  res.json({ mensaje: "✅ Web Service funcionando en Render" });
});

// Endpoint: mostrar usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM practica3.usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error en consulta:", err); // 👈 imprime error real
    res.status(500).json({ error: err.message }); // 👈 muestra detalle
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
