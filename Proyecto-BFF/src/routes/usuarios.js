const express = require("express");
const router = express.Router();
const Usuario = require("../../Usuario");

// OBTENER TODOS LOS USUARIOS
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error obteniendo usuarios"
    });
  }
});

// ELIMINAR USUARIO
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        msg: "Usuario no encontrado"
      });
    }

    await usuario.destroy();

    res.json({
      msg: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Error eliminando usuario"
    });
  }
});


module.exports = router;