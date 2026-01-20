const express = require("express");
const router = express.Router();
const Usuario = require("../Usuario");

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'nombre', 'correo', 'fecha_registro']
    });
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error en /usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

module.exports = router;
