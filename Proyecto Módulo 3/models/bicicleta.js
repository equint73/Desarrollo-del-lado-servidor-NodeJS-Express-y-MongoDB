const mongoose=require('mongoose');
const schema=new mongoose.Schema({marca:{type:String,required:true,trim:true},modelo:{type:String,required:true,trim:true},tipo:{type:String,required:true,trim:true},precio:{type:Number,required:true,min:0},disponible:{type:Boolean,default:true},ubicacion:{type:String,default:'Tegucigalpa'}},{timestamps:true});
module.exports=mongoose.model('Bicicleta',schema);
