const express = require("express");
const router = express.Router();

const Usuario = require("../../Usuario");

router.post("/google", async (req, res) => {
  try {

    const { nombre, correo } = req.body;

    let usuario = await Usuario.findOne({
      where: { correo }
    });

    if (!usuario) {

      usuario = await Usuario.create({
        nombre,
        correo
      });
    }

    res.json({
      ok: true,
      usuario
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error en auth Google"
    });
  }
});

module.exports = router;