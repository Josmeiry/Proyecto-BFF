const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Servicios funcionando" });
});

module.exports = router;
