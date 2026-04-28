const { DataTypes } = require("sequelize");
const sequelize = require("./src/db/bd");


const ServiciosCarWash = sequelize.define("servicios_carwash", {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_carwash: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_modelo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  historial_visitas: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  carwash: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "servicios_carwash",
  timestamps: false,
});
