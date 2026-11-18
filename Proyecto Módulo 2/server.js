const app=require('./app');
const {conectarDB}=require('./config/database');
const PORT=process.env.PORT||3000;
(async()=>{try{await conectarDB();app.listen(PORT,()=>console.log(`Servidor en http://localhost:${PORT}`));}
catch(e){console.error('Error al iniciar:',e.message);process.exit(1);}})();
