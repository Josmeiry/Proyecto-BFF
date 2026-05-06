const express = require("express");
const router = express.Router();
const { ImagenCarwash } = require("../models");
const fs = require("fs");
const path = require("path");

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
    const imagen = await ImagenCarwash.findOne({
  where: { id_imagen: req.params.id }
});

    if (!imagen) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    // 📌 Sacar nombre del archivo desde la URL
    const nombreArchivo = imagen.url.split("/uploads/")[1];

    const ruta = path.join(__dirname, "../uploads", nombreArchivo);

    // 🔥 eliminar archivo físico
    if (fs.existsSync(ruta)) {
      fs.unlinkSync(ruta);
    }

    // 🔥 eliminar de BD
    await imagen.destroy();

    res.json({ mensaje: "Imagen eliminada correctamente" });

  } catch (error) {
    console.error(error);
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