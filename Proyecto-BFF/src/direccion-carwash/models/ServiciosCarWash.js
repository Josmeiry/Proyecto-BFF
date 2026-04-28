const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const ServiciosCarWash = sequelize.define("servicios_carwash", {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_carwash: DataTypes.INTEGER,
  id_modelo: DataTypes.INTEGER,
  nombre: DataTypes.STRING,
  precio: DataTypes.FLOAT,
}, {
  tableName: "servicios_carwash",
  timestamps: false,
});

module.exports = ServiciosCarWash;
