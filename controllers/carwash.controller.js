const CarWash = require("../Proyecto-BFF/src/direccion-carwash/models/CarWash");
const ServiciosCarWash = require("../Proyecto-BFF/src/direccion-carwash/models/ServiciosCarWash");


const carwashPorModelo = async (req, res) => {
  try {
    const { id_modelo } = req.params;

    const carwash = await CarWash.findAll({
      include: {
        model: ServiciosCarWash,
        where: { id_modelo },
        attributes: [], // no traemos servicios, solo filtramos
      },
    });

    res.json(carwash);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo carwash" });
  }
};

module.exports = { carwashPorModelo };
