// carwash/index.js

const express = require("express");
const router = express.Router();

try {
    const loginRouter = require("../src/routes/login-carwash");
    console.log("✅ Éxito al importar login-carwash");
    router.use("/", loginRouter);
} catch (error) {
    console.error("❌ ERROR CRÍTICO al importar login-carwash:", error.message);
}


try {
    const registrarRouter = require("../src/routes/registrar-carwash");
    console.log("✅ Éxito al importar registrar-carwash");
    router.use("/", registrarRouter);
} catch (error) {
    console.error("❌ ERROR CRÍTICO al importar registrar-carwash:", error.message);
}

module.exports = router;