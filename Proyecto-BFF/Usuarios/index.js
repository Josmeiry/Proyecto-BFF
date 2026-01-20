const express = require("express");
const router = express.Router();

router.use("/", require("../src/routes/login-usuario"));
router.use("/", require("./registrar-usuario"));
router.use("/",require("./usuarioss"));

module.exports = router;
