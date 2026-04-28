const express = require("express");
const router = express.Router();

const Usuario = require("../Usuario");
const Carwash = require("../Carwash");

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {

    // 🔎 Buscar en usuarios
    const usuario = await Usuario.findOne({ where: { correo } });

    if (usuario) {
      if (usuario.contrasena !== contrasena) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      return res.json({
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: "usuario"
      });
    }

    // 🔎 Buscar en carwash
    const carwash = await Carwash.findOne({ where: { correo } });

    if (carwash) {
      if (carwash.contrasena !== contrasena) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      return res.json({
        id: carwash.id_carwash,
        nombre: carwash.nombre,
        correo: carwash.correo,
        rol: "carwash"
      });
    }

    

    return res.status(404).json({ error: "Usuario no encontrado" });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;