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

router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ['id_usuario', 'nombre', 'correo']
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    console.error("❌ Error en /usuarios/:id:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

router.put("/usuarios/:id", async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.update({
      nombre,
      correo,
      contrasena
    });

    res.json({ message: "Usuario actualizado correctamente" });

  } catch (err) {
    console.error("❌ Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

module.exports = router;
