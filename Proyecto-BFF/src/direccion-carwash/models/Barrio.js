const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Barrio = sequelize.define("barrio", {
  id_barrio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  id_ciudad: DataTypes.INTEGER,
}, {
  tableName: "barrio",
  timestamps: false,
});

module.exports = Barrio;
