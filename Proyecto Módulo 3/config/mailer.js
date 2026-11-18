const nodemailer=require('nodemailer');let testTransport;
async function transporter(){
 if(process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS)return nodemailer.createTransport({host:process.env.SMTP_HOST,port:+(process.env.SMTP_PORT||587),secure:+process.env.SMTP_PORT===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
 if(!testTransport){const a=await nodemailer.createTestAccount();testTransport=nodemailer.createTransport({host:'smtp.ethereal.email',port:587,secure:false,auth:{user:a.user,pass:a.pass}})}return testTransport;
}
exports.sendMail=async msg=>{const t=await transporter(),info=await t.sendMail({from:process.env.MAIL_FROM||'Red de Bicicletas <no-reply@example.test>',...msg});const preview=nodemailer.getTestMessageUrl(info);if(preview)console.log('Vista previa del correo enviado:',preview);return {messageId:info.messageId,preview}};
