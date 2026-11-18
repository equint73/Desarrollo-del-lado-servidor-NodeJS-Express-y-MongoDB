const r=require('express').Router(),B=require('../models/bicicleta'),{requireJwt}=require('../middleware/auth');r.use(requireJwt);
r.get('/',async(q,s,n)=>{try{s.json(await B.find())}catch(e){n(e)}});
r.get('/:id',async(q,s,n)=>{try{const x=await B.findById(q.params.id);if(!x)return s.status(404).json({error:'Bicicleta no encontrada.'});s.json(x)}catch(e){n(e)}});
r.post('/',async(q,s,n)=>{try{s.status(201).json(await B.create(q.body))}catch(e){n(e)}});
r.put('/:id',async(q,s,n)=>{try{const x=await B.findByIdAndUpdate(q.params.id,q.body,{new:true,runValidators:true});if(!x)return s.status(404).json({error:'Bicicleta no encontrada.'});s.json(x)}catch(e){n(e)}});
r.delete('/:id',async(q,s,n)=>{try{const x=await B.findByIdAndDelete(q.params.id);if(!x)return s.status(404).json({error:'Bicicleta no encontrada.'});s.json({message:'Bicicleta eliminada.',bicicleta:x})}catch(e){n(e)}});module.exports=r;
