// Admin.js
const { DataTypes } = require("sequelize");
const sequelize = require("./bd");

const Admin = sequelize.define("Admin", {
  id_admin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "admin",
  timestamps: false
});

module.exports = Admin;
