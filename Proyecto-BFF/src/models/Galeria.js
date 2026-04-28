// models/Galeria.js
module.exports = (sequelize, DataTypes) => {
  const Galeria = sequelize.define("Galeria", {
    id_galeria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_carwash: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: "galeria",
    timestamps: false
  });

  return Galeria;
};