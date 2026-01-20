const express = require("express");
const router = express.Router();
const CarWash = require("../../CarWash");

router.get("/:id", async (req, res) => {
  const carwash = await CarWash.findByPk(req.params.id);
  if (!carwash) return res.status(404).json({ msg: "No encontrado" });
  res.json(carwash);
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
