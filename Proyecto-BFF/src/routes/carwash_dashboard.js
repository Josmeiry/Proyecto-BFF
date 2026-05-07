const express = require("express");
const router = express.Router();
const CarWash = require("../../CarWash");


router.get("/", async (req, res) => {
  try {

    const carwashesDB = await CarWash.findAll({
      attributes: [
        "id_carwash",
        "nombre_carwash"
      ]
    });

    const carwashes = carwashesDB.map(cw => ({
      ...cw.toJSON(),
      estado: "activo"
    }));

    res.json(carwashes);

  } catch (error) {

    console.error("Error obteniendo carwash:", error);

    res.status(500).json({
      error: "Error del servidor"
    });

  }
});

router.put("/:id", async (req, res) => {
  const carwash = await CarWash.findByPk(req.params.id);
  if (!carwash) return res.status(404).json({ msg: "No encontrado" });

  await carwash.update(req.body);
  res.json({ msg: "Actualizado correctamente" });
});

router.delete("/:id", async (req, res) => {
  const carwash = await CarWash.findByPk(req.params.id);
  if (!carwash) return res.status(404).json({ msg: "No encontrado" });

  await carwash.destroy();
  res.json({ msg: "Eliminado correctamente" });
});

module.exports = router;
