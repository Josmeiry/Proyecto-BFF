// src/routes/index.js
const express = require("express");
const router = express.Router();

console.log("📌 Rutas principales cargadas");
router.use("/login-car", require("./login-carwash"));
router.use("/registrar", require("./registrar-carwash"));
router.use("/admin", require("./admin-login"));

router.use("/carwash", require("./carwash_dashboard"));

router.use("/api/uploads", require("./uploads"));


router.use("/index", require("./../../Usuarios/index"));

//router.use("/carwash", require("../../carwash"));


router.use("/", require("./login-usuario"));

module.exports = router;
