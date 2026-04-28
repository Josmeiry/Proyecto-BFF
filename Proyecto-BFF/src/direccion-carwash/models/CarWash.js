const { DataTypes } = require("sequelize");
const sequelize = require("../../db/bd");
const DireccionCarwash = require("./DireccionCarwash");
const CarWash = sequelize.define("carwash", {
  id_carwash: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_carwash: DataTypes.STRING,
  correo: DataTypes.STRING,
  contrasena: DataTypes.STRING,
  id_direccion: DataTypes.INTEGER,

  telefono: DataTypes.STRING,
  horario: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  calificacion_promedio: DataTypes.FLOAT,
  vistas_perfil: DataTypes.INTEGER,
  clics_ver_detalles: DataTypes.INTEGER,
  clics_como_llegar: DataTypes.INTEGER

}, {
  tableName: "carwash",
  timestamps: false,
});


module.exports = CarWash;