const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Calle = sequelize.define("calle", {
  id_calle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  id_barrio: DataTypes.INTEGER,
}, {
  tableName: "calle",
  timestamps: false,
});

module.exports = Calle;
