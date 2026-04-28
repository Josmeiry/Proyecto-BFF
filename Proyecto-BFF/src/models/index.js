const { DataTypes } = require("sequelize");
const sequelize = require("../db/bd");
const CarWash = require("../direccion-carwash/models/CarWash");
const ImagenCarwash = require("./ImagenCarwash");


// ✅ RELACIONES
CarWash.hasMany(ImagenCarwash, {
  foreignKey: "id_carwash",
  as: "imagenes"
});

ImagenCarwash.belongsTo(CarWash, {
  foreignKey: "id_carwash"
});

// ✅ 4. EXPORTAR
module.exports = {
  sequelize,
  CarWash,
  ImagenCarwash
};