const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Pais = sequelize.define("pais", {
  id_pais: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
}, {
  tableName: "pais",
  timestamps: false,
});

module.exports = Pais;
