// CarWash.js
const { DataTypes } = require("sequelize");
const sequelize = require("./bd"); // 🔹 Corrige la ruta

const CarWash = sequelize.define(
  "CarWash",
  {
    id_carwash: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_carwash: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasena: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.TEXT },
  },
  { tableName: "carwash", timestamps: false }
);

module.exports = CarWash;
