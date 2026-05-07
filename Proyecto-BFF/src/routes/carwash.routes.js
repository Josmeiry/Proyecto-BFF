
const express = require("express");
const router = express.Router();
const { carwashPorModelo } = require("../../../controllers/carwash.controller");
const ImagenCarwash = require("../models/ImagenCarwash");




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
} = require("../direccion-carwash/models/index");

// sumar vista
router.post("/carwash/:id/view", async (req, res) => {
  await CarWash.increment("vistas_perfil", { where: { id: req.params.id } });
  res.sendStatus(200);
});

// sumar click
router.post("/carwash/:id/click", async (req, res) => {
  await CarWash.increment("clics_ver_detalles", { where: { id: req.params.id } });
  res.sendStatus(200);
});

router.post("/carwash/:id/click_llegar", async (req, res) => {
  await CarWash.increment("clics_como_llegar", { where: { id: req.params.id } });
  res.sendStatus(200);
});

/* =========================
   OBTENER TODOS LOS CARWASH
========================= */
router.get("/", async (req, res) => {
  try {

    const carwashes = await CarWash.findAll({
      include: [
        {
          model: ImagenCarwash,
          as: "imagenes",
          attributes: ["url", "descripcion"]
        }
      ]
    });

    res.json(carwashes);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      error: "Error al obtener carwash"
    });
  }
});

/* =========================
   🔹 OBTENER CARWASH + DIRECCIÓN
========================= */
router.get("/por-modelo/:id_modelo", carwashPorModelo);


router.get("/:id", async (req, res) => {
  
  try {

    const carwash = await CarWash.findByPk(req.params.id, {
  include: [
    {
     
      model: ImagenCarwash,
      as: "imagenes",
      attributes: ["url", "descripcion"]
      },
      {
      model: DireccionCarwash,
      as: "direccion",
      include: [
        {
          model: Calle,
          as: "calle",
          attributes: ["nombre"],
          include: [
            {
              model: Barrio,
              as: "barrio",
              attributes: ["nombre"],
              include: [
                {
                  model: Ciudad,
                  as: "ciudad",
                  attributes: ["nombre"],
                  include: [
                    {
                      model: Municipio,
                      as: "municipio",
                      attributes: ["nombre"],
                      include: [
                        {
                          model: Provincia,
                          as: "provincia",
                          attributes: ["nombre"],
                          include: [
                            {
                              model: Region,
                              as: "region",
                              attributes: ["nombre"],
                              include: [
                                {
                                  model: Pais,
                                  as: "pais",
                                  attributes: ["nombre"]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

   

    if (!carwash) {
      return res.status(404).json({ error: "CarWash no encontrado" });
    }

    

    res.json(carwash);


  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Error al obtener carwash" });
  }
});

module.exports = router;

// console.log("direccion completa cargada!!!!");