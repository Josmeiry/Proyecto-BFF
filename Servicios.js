const { DataTypes } = require("sequelize");
const sequelize = require("./src/db/bd");

const Servicio = sequelize.define("servicio", {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_vehiculo: {
    type: DataTypes.ENUM("normal", "premium", "moto"),
    allowNull: false,
  }
}, {
  tableName: "servicios",
  timestamps: false,
});
