const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Servicios Carwash funcionando" });
});

module.exports = router;
