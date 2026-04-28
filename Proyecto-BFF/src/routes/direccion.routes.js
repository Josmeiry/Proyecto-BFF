const express = require("express");
const router = express.Router();



// 👇 IMPORTA LA INSTANCIA REAL
const sequelize = require("../db/bd");

// 👇 IMPORTA MODELOS DESDE SUS ARCHIVOS
const Pais = require("../direccion-carwash/models/Pais");
const Region = require("../direccion-carwash/models/Region");
const Provincia = require("../direccion-carwash/models/Provincia");
const Municipio = require("../direccion-carwash/models/Municipio");
const Ciudad = require("../direccion-carwash/models/Ciudad");
const Barrio = require("../direccion-carwash/models/Barrio");
const Calle = require("../direccion-carwash/models/Calle");
const DireccionCarwash = require("../direccion-carwash/models/DireccionCarwash");

const CarWash = require("../direccion-carwash/models/CarWash");


/* =========================
   🔹 GUARDAR DIRECCIÓN COMPLETA (SOLO UNA VEZ)
========================= */
router.post("/", async (req, res) => {
  const { id_carwash, direccion } = req.body;

  if (!id_carwash || !direccion) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const {
    pais,
    region,
    provincia,
    municipio,
    ciudad,
    barrio,
    calle
  } = direccion;

  if (!pais || !region || !provincia || !municipio || !ciudad || !barrio || !calle) {
    return res.status(400).json({
      error: "Todos los campos de dirección son obligatorios"
    });
  }

  const t = await sequelize.transaction();

  try {
    // 🚫 EVITAR CREAR OTRA DIRECCIÓN SI YA EXISTE
    const carwash = await CarWash.findByPk(id_carwash, { transaction: t });

    if (!carwash) {
      await t.rollback();
      return res.status(404).json({ error: "CarWash no encontrado" });
    }

    if (carwash.id_direccion) {
      await t.rollback();
      return res.status(400).json({
        error: "Este CarWash ya tiene una dirección registrada"
      });
    }

    // 1️⃣ PAÍS
    const [paisDB] = await Pais.findOrCreate({
      where: { nombre: pais },
      transaction: t
    });

    // 2️⃣ REGIÓN
    const [regionDB] = await Region.findOrCreate({
      where: {
        nombre: region,
        id_pais: paisDB.id_pais
      },
      transaction: t
    });

    // 3️⃣ PROVINCIA
    const [provinciaDB] = await Provincia.findOrCreate({
      where: {
        nombre: provincia,
        id_region: regionDB.id_region
      },
      transaction: t
    });

    // 4️⃣ MUNICIPIO
    const [municipioDB] = await Municipio.findOrCreate({
      where: {
        nombre: municipio,
        id_provincia: provinciaDB.id_provincia
      },
      transaction: t
    });

    // 5️⃣ CIUDAD
    const [ciudadDB] = await Ciudad.findOrCreate({
      where: {
        nombre: ciudad,
        id_municipio: municipioDB.id_municipio
      },
      transaction: t
    });

    // 6️⃣ BARRIO
    const [barrioDB] = await Barrio.findOrCreate({
      where: {
        nombre: barrio,
        id_ciudad: ciudadDB.id_ciudad
      },
      transaction: t
    });

    // 7️⃣ CALLE
    const [calleDB] = await Calle.findOrCreate({
      where: {
        nombre: calle,
        id_barrio: barrioDB.id_barrio
      },
      transaction: t
    });

    // 8️⃣ DIRECCIÓN
    const direccionCarwash = await DireccionCarwash.create(
      {
        id_calle: calleDB.id_calle
      },
      { transaction: t }
    );

    // 9️⃣ ASIGNAR DIRECCIÓN AL CARWASH
    await CarWash.update(
      { id_direccion: direccionCarwash.id_direccion },
      { where: { id_carwash }, transaction: t }
    );

    await t.commit();

    res.json({
      mensaje: "Dirección guardada correctamente",
      id_direccion: direccionCarwash.id_direccion
    });

  } catch (error) {
    await t.rollback();
    console.error("ERROR DIRECCIÓN:", error);

    res.status(500).json({
      error: "Error al guardar la dirección"
    });
  }
});

/* =========================
   🔹 ACTUALIZAR DIRECCIÓN (NO CREA NUEVA)
========================= */
router.put("/:id_direccion", async (req, res) => {
  const { direccion } = req.body;

  if (!direccion) {
    return res.status(400).json({ error: "Dirección requerida" });
  }

  const {
    pais,
    region,
    provincia,
    municipio,
    ciudad,
    barrio,
    calle
  } = direccion;

  if (!pais || !region || !provincia || !municipio || !ciudad || !barrio || !calle) {
    return res.status(400).json({
      error: "Todos los campos de dirección son obligatorios"
    });
  }

  const t = await sequelize.transaction();

  try {
    // 🔍 BUSCAR DIRECCIÓN EXISTENTE
    const direccionCarwash = await DireccionCarwash.findByPk(
      req.params.id_direccion,
      { transaction: t }
    );

    if (!direccionCarwash) {
      await t.rollback();
      return res.status(404).json({ error: "Dirección no encontrada" });
    }

    // 🔁 SOLO ACTUALIZA LA JERARQUÍA, NO CREA DIRECCIÓN NUEVA
    const [paisDB] = await Pais.findOrCreate({
      where: { nombre: pais },
      transaction: t
    });

    const [regionDB] = await Region.findOrCreate({
      where: {
        nombre: region,
        id_pais: paisDB.id_pais
      },
      transaction: t
    });

    const [provinciaDB] = await Provincia.findOrCreate({
      where: {
        nombre: provincia,
        id_region: regionDB.id_region
      },
      transaction: t
    });

    const [municipioDB] = await Municipio.findOrCreate({
      where: {
        nombre: municipio,
        id_provincia: provinciaDB.id_provincia
      },
      transaction: t
    });

    const [ciudadDB] = await Ciudad.findOrCreate({
      where: {
        nombre: ciudad,
        id_municipio: municipioDB.id_municipio
      },
      transaction: t
    });

    const [barrioDB] = await Barrio.findOrCreate({
      where: {
        nombre: barrio,
        id_ciudad: ciudadDB.id_ciudad
      },
      transaction: t
    });

    const [calleDB] = await Calle.findOrCreate({
      where: {
        nombre: calle,
        id_barrio: barrioDB.id_barrio
      },
      transaction: t
    });

    // ✅ ACTUALIZA SOLO LA CALLE
    await direccionCarwash.update(
      { id_calle: calleDB.id_calle },
      { transaction: t }
    );

    await t.commit();

    res.json({ mensaje: "Dirección actualizada correctamente" });

  } catch (error) {
    await t.rollback();
    console.error("ERROR UPDATE DIRECCIÓN:", error);

    res.status(500).json({
      error: "Error al actualizar la dirección"
    });
  }
});

module.exports = router;
