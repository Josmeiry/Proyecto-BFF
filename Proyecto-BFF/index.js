require('dotenv').config();
const express = require('express');
const cors = require('cors');


const routes = require('./src/routes/correr');
const sequelize = require('./src/db/bd');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// DEBUG: mostrar cada petición que entra
app.use((req, res, next) => {
  console.log("➡ Incoming:", req.method, req.path);
  next();
});


// Sincronización de modelos
sequelize.sync()
  .then(() => console.log("📦 Tablas sincronizadas correctamente"))
  .catch(err => console.error("❌ Error al sincronizar tablas:", err));

// Página principal del backend
app.get("/", (req, res) => {
  res.send(`<h1>🚀 Backend funcionando correctamente</h1>`);
});

//  todas las rutas (todas agrupadas en /src/routes)
app.use("/", routes);
app.use("/uploads", express.static("uploads"));

const direccionRoutes = require("./src/direccion-carwash/routes/direccion.routes");
require("./src/direccion-carwash"); // ⬅ carga relaciones

app.use("/direccion", direccionRoutes);


// Servidor
const PORT = process.env.PORT || 2629;
app.listen(PORT, () => 
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
