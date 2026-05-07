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

module.exports = router;