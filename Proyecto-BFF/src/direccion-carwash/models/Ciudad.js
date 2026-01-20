const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Ciudad = sequelize.define("ciudad", {
  id_ciudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  codigo_postal: DataTypes.STRING,
  id_municipio: DataTypes.INTEGER,
}, {
  tableName: "ciudad",
  timestamps: false,
});

module.exports = Ciudad;
