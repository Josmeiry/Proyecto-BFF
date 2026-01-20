const sequelize = require("../db/bd"); 
// 👆 ajusta la ruta si tu conexión está en otro lugar

const DireccionCarwash = require("./models/DireccionCarwash");
const Calle = require("./models/Calle");
const Barrio = require("./models/Barrio");
const Ciudad = require("./models/Ciudad");
const Municipio = require("./models/Municipio");
const Provincia = require("./models/Provincia");
const Region = require("./models/Region");
const Pais = require("./models/Pais");

// =======================
// RELACIONES
// =======================

// dirección → calle
DireccionCarwash.belongsTo(Calle, { foreignKey: "id_calle" });

// cascada
Calle.belongsTo(Barrio, { foreignKey: "id_barrio" });
Barrio.belongsTo(Ciudad, { foreignKey: "id_ciudad" });
Ciudad.belongsTo(Municipio, { foreignKey: "id_municipio" });
Municipio.belongsTo(Provincia, { foreignKey: "id_provincia" });
Provincia.belongsTo(Region, { foreignKey: "id_region" });
Region.belongsTo(Pais, { foreignKey: "id_pais" });

module.exports = {
  sequelize,          // ✅ CLAVE
  DireccionCarwash,
  Calle,
  Barrio,
  Ciudad,
  Municipio,
  Provincia,
  Region,
  Pais,
};
