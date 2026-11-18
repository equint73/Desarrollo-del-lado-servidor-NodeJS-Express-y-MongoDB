const mongoose=require('mongoose');
const {conectarDB}=require('../../config/database');
const Bicicleta=require('../../models/bicicleta');

describe('Modelo Bicicleta - persistencia MongoDB',()=>{
 beforeAll(async()=>{await conectarDB();});
 beforeEach(async()=>{await Bicicleta.deleteMany({});});
 afterAll(async()=>{await Bicicleta.deleteMany({});await mongoose.disconnect();});

 it('guarda un documento y lo recupera desde MongoDB',async()=>{
  const b=await Bicicleta.create({codigo:'MODEL-001',color:'Amarilla',ubicacion:{lat:14.1,lng:-87.2}});
  const guardada=await Bicicleta.findById(b._id);
  expect(guardada).not.toBeNull();expect(guardada.codigo).toBe('MODEL-001');
 });
 it('persiste modificaciones mediante save()',async()=>{
  const b=await Bicicleta.create({codigo:'MODEL-002',color:'Roja',ubicacion:{lat:14.1,lng:-87.2}});
  b.color='Morada';await b.save();
  const recuperada=await Bicicleta.findById(b._id);
  expect(recuperada.color).toBe('Morada');
 });
 it('valida los campos obligatorios',async()=>{
  const b=new Bicicleta({codigo:'MODEL-003'});
  let error;try{await b.validate();}catch(e){error=e;}
  expect(error).toBeDefined();expect(error.errors.color).toBeDefined();expect(error.errors.ubicacion).toBeDefined();
 });
 it('no permite codigos duplicados',async()=>{
  await Bicicleta.create({codigo:'MODEL-DUP',color:'Azul',ubicacion:{lat:14.1,lng:-87.2}});
  let error;try{await Bicicleta.create({codigo:'MODEL-DUP',color:'Verde',ubicacion:{lat:14.2,lng:-87.3}});}catch(e){error=e;}
  expect(error).toBeDefined();expect(error.code).toBe(11000);
 });
});
