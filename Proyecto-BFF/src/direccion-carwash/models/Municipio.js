const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Municipio = sequelize.define("municipio", {
  id_municipio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  id_provincia: DataTypes.INTEGER,
}, {
  tableName: "municipio",
  timestamps: false,
});

module.exports = Municipio;
