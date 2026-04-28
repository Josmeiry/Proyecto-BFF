const express = require("express");
const router = express.Router();
const { ImagenCarwash } = require("../models");


const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🔹 DELETE imagen
router.delete("/:id", async (req, res) => {
  try {
    await ImagenCarwash.destroy({
      where: { id_imagen: req.params.id }
    });

    res.json({ mensaje: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id_carwash", upload.single("imagen"), async (req, res) => {
  try {
    const { id_carwash } = req.params;

    const nuevaImagen = await ImagenCarwash.create({
      id_carwash,
      url: `http://localhost:2629/uploads/${req.file.filename}` // ✅ AQUÍ
    });

    res.json(nuevaImagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error subiendo imagen" });
  }
});

router.get("/:id_carwash", async (req, res) => {
  try {
    const { id_carwash } = req.params;

    const imagenes = await ImagenCarwash.findAll({
      where: { id_carwash } // 🔥 FILTRO CLAVE
    });

    res.json(imagenes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo imágenes" });
  }
});

module.exports = router;