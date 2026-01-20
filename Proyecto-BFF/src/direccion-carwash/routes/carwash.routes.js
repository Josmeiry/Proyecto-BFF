const express = require("express");
const router = express.Router();

const {
  CarWash,
  DireccionCarwash,
  Calle,
  Barrio,
  Ciudad,
  Municipio,
  Provincia,
  Region,
  Pais
} = require("../../db/bd");

/* =========================
   🔹 OBTENER CARWASH + DIRECCIÓN
========================= */
router.get("/:id", async (req, res) => {
  try {
    const carwash = await CarWash.findByPk(req.params.id, {
      include: {
        model: DireccionCarwash,
        include: {
          model: Calle,
          include: {
            model: Barrio,
            include: {
              model: Ciudad,
              include: {
                model: Municipio,
                include: {
                  model: Provincia,
                  include: {
                    model: Region,
                    include: {
                      model: Pais
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!carwash) {
      return res.status(404).json({ error: "CarWash no encontrado" });
    }

    res.json(carwash);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener carwash" });
  }
});

module.exports = router;
