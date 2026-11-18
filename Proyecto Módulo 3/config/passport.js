const LocalStrategy=require('passport-local').Strategy, User=require('../models/user');
module.exports=function(passport){
 passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
  try{const u=await User.findOne({email:email.toLowerCase().trim()}).select('+password');if(!u||!(await u.comparePassword(password)))return done(null,false,{message:'Correo o contraseña incorrectos.'});if(!u.verificado)return done(null,false,{message:'Verifica tu correo antes de iniciar sesión.'});return done(null,u)}catch(e){done(e)}
 }));
 passport.serializeUser((user,done)=>done(null,user.id));
 passport.deserializeUser(async(id,done)=>{try{done(null,await User.findById(id))}catch(e){done(e)}});
};
