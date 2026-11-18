const mongoose=require('mongoose'), bcrypt=require('bcryptjs');
const schema=new mongoose.Schema({
 email:{type:String,required:true,unique:true,lowercase:true,trim:true,match:/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/},
 password:{type:String,required:true,minlength:8,select:false},
 passwordResetToken:{type:String,default:null,select:false},
 passwordResetTokenExpires:{type:Date,default:null,select:false},
 verificado:{type:Boolean,default:false,required:true}
},{timestamps:true});
schema.pre('save',async function(){if(this.isModified('password'))this.password=await bcrypt.hash(this.password,12)});
schema.methods.comparePassword=function(p){return bcrypt.compare(p,this.password)};
module.exports=mongoose.model('User',schema);
