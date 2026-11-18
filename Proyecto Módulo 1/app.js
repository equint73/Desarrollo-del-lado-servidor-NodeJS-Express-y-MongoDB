const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bicicletasRouter = require('./routes/bicicletas');
const Bicicleta = require('./models/bicicleta');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/bienvenida', (req, res) => {
  res.send('<h1>Welcome to Express</h1><p>Servidor de Bicicletas API funcionando correctamente.</p>');
});

app.use('/api/bicicletas', bicicletasRouter);

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

async function iniciarServidor() {
  try {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log('Conectado a MongoDB en memoria.');

    if (await Bicicleta.countDocuments() === 0) {
      await Bicicleta.insertMany([
        { codigo: 'BICI-001', color: 'Azul', ubicacion: { lat: 14.1012, lng: -87.2040 }, disponible: true },
        { codigo: 'BICI-002', color: 'Roja', ubicacion: { lat: 14.0988, lng: -87.2110 }, disponible: true }
      ]);
      console.log('Se cargaron dos bicicletas de ejemplo.');
    }

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
      console.log(`Bienvenida: http://localhost:${PORT}/bienvenida`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la aplicacion:', error);
    process.exit(1);
  }
}
iniciarServidor();
