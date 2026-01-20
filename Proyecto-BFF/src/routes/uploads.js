const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.body.id_carwash;
    const dir = `uploads/carwash_${id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, "perfil" + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/", upload.single("imagen"), (req, res) => {
  const id = req.body.id_carwash;
  const jsonPath = "data/carwash.json";

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  data[id].imagen = `/uploads/carwash_${id}/perfil${path.extname(req.file.originalname)}`;

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  res.json({ imagen: data[id].imagen });
});

router.delete("/:id", (req, res) => {
  const fs = require("fs");

  const id = req.params.id;
  const jsonPath = "data/carwash.json";

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  if (!data[id] || !data[id].imagen) {
    return res.status(404).json({ error: "No hay imagen" });
  }

  const imgPath = "." + data[id].imagen;

  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath); // 🔥 borra el archivo
  }

  data[id].imagen = null;

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  res.json({ mensaje: "Imagen eliminada" });
});


module.exports = router;
