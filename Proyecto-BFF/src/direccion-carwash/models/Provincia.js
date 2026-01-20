const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Provincia = sequelize.define("provincia", {
  id_provincia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  id_region: DataTypes.INTEGER,
}, {
  tableName: "provincia",
  timestamps: false,
});

module.exports = Provincia;
