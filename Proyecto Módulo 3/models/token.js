const mongoose=require('mongoose');
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},token:{type:String,required:true,unique:true},createdAt:{type:Date,default:Date.now,expires:86400}});
module.exports=mongoose.model('Token',schema);
