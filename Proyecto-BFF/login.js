// routes/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const router = express.Router();

// 🔹 REGISTRAR USUARIO
router.post("/registrar", async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    // 1️⃣ Verificar si el correo ya existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // 2️⃣ Encriptar contraseña
    const hashedPass = await bcrypt.hash(contrasena, 10);

    // 3️⃣ Insertar usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPass,
    });

    res.json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error en /registrar:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// 🔹 LOGIN USUARIO NORMAL
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseña
    const validPass = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!validPass) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({ mensaje: "Bienvenido", usuario });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// 🔹 LISTAR USUARIOS
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id_usuario", "nombre", "correo", "fecha_registro"],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

module.exports = router;
