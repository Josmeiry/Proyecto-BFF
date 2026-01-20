console.log("Ruta LOGIN cargada");

const express = require("express");
const router = express.Router();
const Usuario = require("../../Usuario");

// LOGIN USUARIO
router.post("/login-usuario", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    

    if (!correo || !contrasena) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({ msg: "Correo incorrecto" });
    }

    console.log("📌 Recibido desde frontend:", JSON.stringify(contrasena));
console.log("📌 Guardado en la base:", JSON.stringify(usuario.contrasena));

    //  AQUI se validan contraseñas EXACTAMENTE igual
    if (String(usuario.contrasena).trim() !== String(contrasena).trim()) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    return res.json({
      msg: "Inicio exitoso",
      usuario
    });

  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

module.exports = router;
