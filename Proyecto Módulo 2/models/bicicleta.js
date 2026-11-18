const mongoose = require('mongoose');
const bicicletaSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true, trim: true },
  color: { type: String, required: true, trim: true },
  ubicacion: {
    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 }
  },
  disponible: { type: Boolean, default: true }
}, { timestamps: true, versionKey: false, collection: 'bicicletas' });
module.exports = mongoose.model('Bicicleta', bicicletaSchema);
