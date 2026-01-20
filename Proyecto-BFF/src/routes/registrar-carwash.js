const express = require("express");
const router = express.Router();
const CarWash = require('../../CarWash');

console.log("✔ registrar-carwash.js SE CARGÓ");

router.post("/", async (req, res) => {
  const { nombre_carwash, correo, contrasena } = req.body;

  try {
    const existe = await CarWash.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ msg: "Correo ya registrado" });
    }

    const cw = await CarWash.create({
      nombre_carwash,
      correo,
      contrasena
    });

    res.json({
      msg: "Carwash registrado correctamente",
      cw
    });

  } catch (err) {
    console.error("❌ Error al registrar:", err);
    res.status(500).json({ msg: "Error al registrar carwash" });
  }
});

module.exports = router;
