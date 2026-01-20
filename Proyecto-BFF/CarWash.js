const { DataTypes } = require("sequelize");
const sequelize = require("./src/db/bd");

const CarWash = sequelize.define("carwash", {
  id_carwash: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_carwash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_direccion: {
    type: DataTypes.INTEGER,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  horario: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  calificacion_promedio: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  vistas_perfil: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  clics_ver_detalles: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  clics_como_llegar: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "carwash",   // 🔥 CLAVE
  timestamps: false,     // 🔥 CLAVE
});

module.exports = CarWash;
