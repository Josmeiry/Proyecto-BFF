const express = require("express");
const router = express.Router();
const CarWash = require("./CarWash"); // ✅ ruta corregida

router.post("/registrar-carwash", async (req, res) => {
  try {
    const { nombre_carwash, correo, contrasena, telefono, descripcion } = req.body;

    const existe = await CarWash.findOne({ where: { correo } });
    if (existe) return res.status(400).json({ msg: "Correo ya registrado" });

    const nuevo = await CarWash.create({ nombre_carwash, correo, contrasena, telefono, descripcion });
    res.json({ msg: "CarWash registrado correctamente ✔", data: nuevo });
  } catch (err) {
    console.error("❌ Error en /registrar-carwash:", err);
    res.status(500).json({ msg: "Error al registrar CarWash" });
  }
});

module.exports = router;
