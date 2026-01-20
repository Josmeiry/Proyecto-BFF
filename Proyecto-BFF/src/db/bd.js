require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Test de conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('🔥 Conectado correctamente a NEON');
  } catch (err) {
    console.error('❌ Error al conectar a la BD:', err);
  }
})();

module.exports = sequelize; // 👈 ESTO ES CLAVE
