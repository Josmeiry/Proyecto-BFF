const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");

const Region = sequelize.define("region", {
  id_region: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  id_pais: DataTypes.INTEGER,
}, {
  tableName: "region",
  timestamps: false,
});

module.exports = Region;
