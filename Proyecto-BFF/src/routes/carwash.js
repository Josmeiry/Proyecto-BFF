const express = require("express");
const router = express.Router();
const CarWash = require("../models/CarWash");

router.get("/carwash", async (req, res) => {
  try {
    const data = await CarWash.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;