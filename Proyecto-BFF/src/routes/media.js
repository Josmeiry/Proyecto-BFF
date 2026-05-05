const express = require("express");
const router = express.Router();
const MediaApp = require("../models/MediaApp");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../Cloudinary");



// STORAGE
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "majoapp",
    resource_type: "auto"
  }
});

const upload = multer({ storage });


// ==========================
// 🔹 SUBIR ARCHIVO
// ==========================
router.post("/", upload.single("archivo"), async (req, res) => {
  try {
    const { entidad_tipo, entidad_id, tipo, categoria } = req.body;

    const nuevo = await MediaApp.create({
      url: req.file.path ,
      nombre: req.file.originalname,
      tipo,
      mime_type: req.file.mimetype,
      size: req.file.size,
      entidad_tipo,
      entidad_id: entidad_id || null,
      categoria
    });

    res.json(nuevo);
    
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Error subiendo archivo" });
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// 🔹 OBTENER ARCHIVOS
// ==========================
router.get("/", async (req, res) => {
  try {
    const { entidad_tipo, entidad_id, categoria } = req.query;

    const where = {};

    if (entidad_tipo) where.entidad_tipo = entidad_tipo;
    if (entidad_id) where.entidad_id = entidad_id;
    if (categoria) where.categoria = categoria;

    const data = await MediaApp.findAll({ where });

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// 🔹 ELIMINAR
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await MediaApp.destroy({
      where: { id: req.params.id }
    });

    res.json({ mensaje: "Eliminado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;