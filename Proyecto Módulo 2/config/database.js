const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/red_bicicletas';
async function conectarDB() { await mongoose.connect(MONGO_URI); console.log('MongoDB conectado:', MONGO_URI); }
module.exports = { conectarDB, MONGO_URI };
