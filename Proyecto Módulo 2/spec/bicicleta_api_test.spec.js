const request=require('supertest');
const mongoose=require('mongoose');
const app=require('../app');
const {conectarDB}=require('../config/database');
const Bicicleta=require('../models/bicicleta');

describe('API de bicicletas - operaciones CRUD',()=>{
 let id;
 beforeAll(async()=>{await conectarDB();});
 beforeEach(async()=>{
  await Bicicleta.deleteMany({});
  const b=await Bicicleta.create({codigo:'BICI-TEST-01',color:'Azul',ubicacion:{lat:14.1012,lng:-87.2040},disponible:true});
  id=b._id.toString();
 });
 afterAll(async()=>{await Bicicleta.deleteMany({});await mongoose.disconnect();});

 it('GET lista las bicicletas',async()=>{
  const r=await request(app).get('/api/bicicletas');
  expect(r.status).toBe(200);expect(r.body.length).toBe(1);expect(r.body[0].codigo).toBe('BICI-TEST-01');
 });
 it('GET por ID devuelve una bicicleta',async()=>{
  const r=await request(app).get(`/api/bicicletas/${id}`);
  expect(r.status).toBe(200);expect(r.body._id).toBe(id);
 });
 it('POST crea y persiste una bicicleta',async()=>{
  const r=await request(app).post('/api/bicicletas').send({codigo:'BICI-POST-01',color:'Verde',ubicacion:{lat:14.102,lng:-87.205},disponible:true});
  expect(r.status).toBe(201);expect(r.body.codigo).toBe('BICI-POST-01');
  expect(await Bicicleta.findById(r.body._id)).not.toBeNull();
 });
 it('PUT actualiza una bicicleta',async()=>{
  const r=await request(app).put(`/api/bicicletas/${id}`).send({color:'Negra',disponible:false});
  expect(r.status).toBe(200);expect(r.body.color).toBe('Negra');expect(r.body.disponible).toBe(false);
 });
 it('DELETE elimina una bicicleta',async()=>{
  const r=await request(app).delete(`/api/bicicletas/${id}`);
  expect(r.status).toBe(200);expect(await Bicicleta.findById(id)).toBeNull();
 });
 it('rechaza un registro sin ubicacion valida',async()=>{
  const r=await request(app).post('/api/bicicletas').send({codigo:'BICI-MALA',color:'Roja'});
  expect(r.status).toBe(400);
 });
});
