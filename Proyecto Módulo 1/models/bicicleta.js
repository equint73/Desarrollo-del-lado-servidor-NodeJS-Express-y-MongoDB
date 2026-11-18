const mongoose = require('mongoose');

const bicicletaSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true, trim: true },
  color: { type: String, required: true, trim: true },
  ubicacion: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  disponible: { type: Boolean, default: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
