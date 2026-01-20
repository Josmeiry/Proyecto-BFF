const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");


const DireccionCarwash = sequelize.define("direccion_carwash", {
  id_direccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_calle: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "direccion_carwash",
  timestamps: false,
});

module.exports = DireccionCarwash;
