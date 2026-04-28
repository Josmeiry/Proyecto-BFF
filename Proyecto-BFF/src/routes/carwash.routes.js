
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