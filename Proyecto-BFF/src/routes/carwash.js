const express = require("express");
const router = express.Router();
const CarWash = require("../../CarWash");



router.get("/carwash", async (req, res) => {
  try {

    const carwashes = await prisma.carwash.findMany();

    res.json(carwashes);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo car washes"
    });

  }
});

module.exports = router;