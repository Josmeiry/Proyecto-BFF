console.log("🔵 login-carwash.js cargado correctamente");

// login-carwash.js
console.log("🔵 login-carwash.js cargado correctamente");

const express = require("express");
const router = express.Router();
const CarWash = require("./CarWash");
// const bcrypt = require("bcryptjs"); // no usado si comparas texto plano

// LOGIN CARWASH (comparación en texto plano)
router.post("/login-carwash", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const carwash = await CarWash.findOne({ where: { correo } });

    if (!carwash) {
      return res.status(404).json({ msg: "Correo incorrecto" });
    }

    // Comparación en texto plano:
    if (carwash.contrasena !== contrasena) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Login correcto
    res.json({
      msg: "Inicio de sesión exitoso",
      carwash
    });
  } catch (err) {
    console.error("❌ Error en /login-carwash:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

module.exports = router;
