
console.log("Cargando modelos de dirección...");

const CarWash = require("./CarWash");
const ServiciosCarWash = require("./ServiciosCarWash");
const DireccionCarwash = require("./DireccionCarwash");
const Calle = require("./Calle");
const Barrio = require("./Barrio");
const Ciudad = require("./Ciudad");
const Municipio = require("./Municipio");
const Provincia = require("./Provincia");
const Region = require("./Region");
const Pais = require("./Pais");

/* =========================
   🔹 RELACIONES SERVICIOS
========================= */
CarWash.hasMany(ServiciosCarWash, {
  foreignKey: "id_carwash",
});

ServiciosCarWash.belongsTo(CarWash, {
  foreignKey: "id_carwash",
});

/* =========================
   🔹 RELACIONES DIRECCIÓN
========================= */

// CarWash → Direccion
CarWash.belongsTo(DireccionCarwash, {
  foreignKey: "id_direccion",
  as: "direccion"
});

DireccionCarwash.hasOne(CarWash, {
  foreignKey: "id_direccion",
  as: "carwash"
});

// Direccion → Calle
DireccionCarwash.belongsTo(Calle, {
  foreignKey: "id_calle",
  as: "calle"
});

// Calle → Barrio
Calle.belongsTo(Barrio, { 
  foreignKey: "id_barrio",
  as: "barrio"
});

// Barrio → Ciudad
Barrio.belongsTo(Ciudad, { 
  foreignKey: "id_ciudad",
  as: "ciudad"
});

// Ciudad → Municipio
Ciudad.belongsTo(Municipio, { 
  foreignKey: "id_municipio",
  as: "municipio"
});

// Municipio → Provincia
Municipio.belongsTo(Provincia, { 
  foreignKey: "id_provincia",
  as: "provincia"
});

// Provincia → Region
Provincia.belongsTo(Region, { 
  foreignKey: "id_region",
  as: "region"
});

// Region → Pais
Region.belongsTo(Pais, { 
  foreignKey: "id_pais",
  as: "pais"
});

module.exports = {
  CarWash,
  ServiciosCarWash,
  DireccionCarwash,
  Calle,
  Barrio,
  Ciudad,
  Municipio,
  Provincia,
  Region,
  Pais,
};