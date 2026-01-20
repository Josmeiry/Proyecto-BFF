
const { DataTypes } = require('sequelize');
const sequelize = require('./src/db/bd');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});
module.exports = Usuario;
