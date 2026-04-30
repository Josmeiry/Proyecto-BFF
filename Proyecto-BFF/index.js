require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Usuario = require("./Usuario");
const routes = require('./src/routes/correr');
const sequelize = require('./src/db/bd');

const app = express();

//cors permiso acceso vercel
const allowedOrigins = [
  "http://localhost:5173",
  "https://proyecto-raewc36y4-josmeiry-munoz-inoas-projects.vercel.app",
  "https://proyecto-ffb.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS bloqueado"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middlewares
app.use(express.json());


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


const mediaRoutes = require("./src/routes/media");
app.use("/media", mediaRoutes);


const carwashDireccion = require("./src/routes/carwash.routes");

app.use("/carwash", carwashDireccion);

const direccionRoutes = require("./src/routes/direccion.routes");
// require("./src/routes"); // ⬅ carga relaciones

app.use("/direccion", direccionRoutes);

//obtener usuario por id 
app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
});

//actualizar usuario 
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await usuario.update({
      nombre,
      correo,
      contrasena
    });

    res.json({ msg: "Usuario actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar" });
  }
});



const galeriaRoutes = require("./src/routes/galeria");
app.use("/galeria", galeriaRoutes);



const serviciosRoutes = require("./src/routes/servicios.routes");
const serviciosCarwashRoutes = require("./src/routes/serviciosCarwash.routes");

app.use("/servicios", serviciosRoutes);
app.use("/servicios-carwash", serviciosCarwashRoutes);


const carwashRoutes = require("./src/routes/carwash.routes");


// app.use("/carwash", carwashRoutes);


// Servidor
const PORT = process.env.PORT || 2629;
app.listen(PORT, () => 
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
