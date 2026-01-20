// routes/admin-login.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// 🔹 Conexión a PostgreSQL (importante: NO subas niveles)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});


console.log("🛠 admin-login.js cargado correctamente");

// 🟢 LOGIN ADMIN
router.post("/admin-login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const admin = await pool.query(
      "SELECT * FROM admin WHERE correo = $1",
      [correo]
    );

    if (admin.rows.length === 0) {
      return res.status(404).json({
        autenticado: false,
        mensaje: "Administrador no encontrado"
      });
    }

    const data = admin.rows[0];

    // 👉 La contraseña NO está encriptada
    if (contrasena !== data.contrasena) {
      return res.status(401).json({
        autenticado: false,
        mensaje: "Contraseña incorrecta"
      });
    }

    res.json({
      autenticado: true,
      mensaje: "Administrador autenticado",
      admin: data
    });

  } catch (err) {
    console.error("❌ Error en /admin-login:", err);
    res.status(500).json({
      autenticado: false,
      mensaje: "Error en el servidor"
    });
  }
});

module.exports = router;
