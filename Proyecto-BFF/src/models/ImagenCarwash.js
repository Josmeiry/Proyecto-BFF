// models/ImagenCarwash.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/bd");

const ImagenCarwash = sequelize.define("ImagenCarwash", {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
   id_carwash: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  id_carwash: DataTypes.INTEGER
}, {
  tableName: "imagenes_carwash",
  timestamps: false
});

module.exports = ImagenCarwash;