const mongoose=require('mongoose');
const {conectarDB}=require('../config/database');
const Bicicleta=require('../models/bicicleta');
(async()=>{try{
 await conectarDB(); await Bicicleta.deleteMany({});
 await Bicicleta.insertMany([
 {codigo:'BICI-001',color:'Azul',ubicacion:{lat:14.1012,lng:-87.2040},disponible:true},
 {codigo:'BICI-002',color:'Roja',ubicacion:{lat:14.0988,lng:-87.2110},disponible:true}
 ]);
 console.log('Dos bicicletas insertadas en red_bicicletas.bicicletas');
}catch(e){console.error(e);process.exitCode=1;}finally{await mongoose.disconnect();}})();
