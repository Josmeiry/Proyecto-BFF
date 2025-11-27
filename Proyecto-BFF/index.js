require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const sequelize = require('./bd');        
const Usuario = require('./Usuario');     
const adminRoutes = require("./admin-login"); // ⬅️ CORRECTO (archivo está en la raíz)

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


app.use("/", require("./admin-login"));


// Sincroniza tablas
sequelize.sync()
  .then(() => console.log("📦 Tablas sincronizadas correctamente"))
  .catch(err => console.error("❌ Error al sincronizar tablas:", err));

// Registrar usuario
app.post('/registrar', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) return res.status(400).json({ error: "Correo ya registrado" });

    const hashedPass = await bcrypt.hash(contrasena, 10);

    const usuario = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPass
    });

    res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario });
  } catch (err) {
    console.error("❌ Error en /registrar:", err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Login usuario
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPass) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ mensaje: "Bienvenido!", usuario });
  } catch (err) {
    console.error("❌ Error en /login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Listar usuarios
app.get('/usuario', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'nombre', 'correo', 'fecha_registro']
    });
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error en /usuario:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

//login carwash 
app.use("/", require("./registrar-carwash"));
app.use("/", require("./login-carwash"));



// Check server
app.get('/', (req, res) => {
  res.send(`<h1>🚀 Backend funcionando correctamente</h1>`);
});

// Servidor
const PORT = process.env.PORT || 2629;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
