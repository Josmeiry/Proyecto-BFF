console.log("🔵 login-carwash.js cargado correctamente");

// login-carwash.js
console.log("✔ login-carwash.js SE CARGÓ");


const express = require("express");
const router = express.Router();
const CarWash = require('../../CarWash');




// LOGIN CARWASH 
router.post("/", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    console.log("📩 Datos recibidos:", req.body);

    const carwash = await CarWash.findOne({ where: { correo } });

    // ✅ PRIMERO verificar si existe
    if (!carwash) {
      return res.status(404).json({ msg: "Correo incorrecto" });
    }

    // ✅ AHORA sí puedes usar carwash
    console.log("🔐 BD:", carwash.contrasena);
    console.log("🧾 FORM:", contrasena);

    if (String(carwash.contrasena).trim() !== String(contrasena).trim()) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    res.json({
  msg: "Login exitoso",
  carwash: {
    id_carwash: carwash.id_carwash,
    nombre_carwash: carwash.nombre_carwash,
    correo: carwash.correo,
    tipo: "carwash"
  }
});

  } catch (err) {
    console.error("❌ Error REAL:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


module.exports = router;
