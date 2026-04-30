const { DataTypes } = require("sequelize");
const sequelize = require("../db/bd");

const MediaApp = sequelize.define("MediaApp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  nombre: DataTypes.STRING,

  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  mime_type: DataTypes.STRING,

  size: DataTypes.INTEGER,

  entidad_tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  entidad_id: DataTypes.INTEGER,

  categoria: DataTypes.STRING

}, {
  tableName: "media_app",
  timestamps: false
});

module.exports = MediaApp;