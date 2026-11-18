const express = require('express');
const mongoose = require('mongoose');
const Bicicleta = require('../models/bicicleta');
const router = express.Router();

function ubicacionValida(u) {
  return u && Number.isFinite(Number(u.lat)) && Number.isFinite(Number(u.lng)) &&
    Number(u.lat) >= -90 && Number(u.lat) <= 90 &&
    Number(u.lng) >= -180 && Number(u.lng) <= 180;
}

router.get('/', async (req, res) => {
  try { res.json(await Bicicleta.find().sort({ codigo: 1 })); }
  catch (e) { res.status(500).json({ error: 'Error al consultar bicicletas' }); }
});

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'ID no valido' });
  try {
    const bici = await Bicicleta.findById(req.params.id);
    if (!bici) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bici);
  } catch (e) { res.status(500).json({ error: 'Error al consultar bicicleta' }); }
});

router.post('/', async (req, res) => {
  const { codigo, color, ubicacion, disponible } = req.body;
  if (!codigo || !color || !ubicacionValida(ubicacion)) {
    return res.status(400).json({ error: 'Envia codigo, color y ubicacion con lat/lng validos' });
  }
  try {
    const bici = await Bicicleta.create({
      codigo, color,
      ubicacion: { lat: Number(ubicacion.lat), lng: Number(ubicacion.lng) },
      disponible: disponible === undefined ? true : Boolean(disponible)
    });
    res.status(201).json(bici);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Ese codigo ya existe' });
    res.status(400).json({ error: 'No se pudo crear bicicleta', detalle: e.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'ID no valido' });
  const cambios = {};
  ['codigo', 'color', 'disponible'].forEach(k => { if (req.body[k] !== undefined) cambios[k] = req.body[k]; });
  if (req.body.ubicacion !== undefined) {
    if (!ubicacionValida(req.body.ubicacion)) return res.status(400).json({ error: 'Ubicacion no valida' });
    cambios.ubicacion = { lat: Number(req.body.ubicacion.lat), lng: Number(req.body.ubicacion.lng) };
  }
  try {
    const bici = await Bicicleta.findByIdAndUpdate(req.params.id, cambios, { new: true, runValidators: true });
    if (!bici) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bici);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Ese codigo ya existe' });
    res.status(400).json({ error: 'No se pudo actualizar bicicleta', detalle: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'ID no valido' });
  try {
    const bici = await Bicicleta.findByIdAndDelete(req.params.id);
    if (!bici) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json({ mensaje: 'Bicicleta eliminada correctamente', bicicleta: bici });
  } catch (e) { res.status(500).json({ error: 'Error al eliminar bicicleta' }); }
});

module.exports = router;
