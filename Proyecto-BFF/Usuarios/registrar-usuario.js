const express = require("express");
const router = express.Router();
const Usuario = require("../Usuario");


router.post("/registrar-usuario", async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    // Verificar si existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(409).json({ msg: "Correo ya registrado" });
    }

   

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contrasena
    });

    return res.status(201).json({ msg: "Usuario registrado", usuario: nuevoUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

module.exports = router;
