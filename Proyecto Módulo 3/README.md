# Red de Bicicletas: autenticación y API

## Instalación
1. Instala Node.js y MongoDB Community.
2. Extrae el ZIP, abre la carpeta en VS Code y ejecuta `npm install`.
3. Copia `.env.example` a `.env`.
4. Inicia MongoDB local.
5. Ejecuta `npm run seed` y luego `npm start`.
6. Abre `http://localhost:3000`.

Base local: `red_bicicletas` (`mongodb://127.0.0.1:27017/red_bicicletas`).

## Credenciales para probar
Válidas: `demo@bicicletas.com` / `Bicicletas123!`
Incorrectas: `demo@bicicletas.com` / `incorrecta`

El seed crea un usuario de demostración ya verificado y dos bicicletas. Para probar el correo de bienvenida, registra otro usuario desde `/register`. Si no configuras SMTP, Nodemailer crea un buzón Ethereal de prueba y muestra en la terminal el enlace de vista previa del correo enviado. Para correo real configura SMTP_HOST, SMTP_PORT, SMTP_USER y SMTP_PASS en `.env`.

## Vistas
`/register`, `/verify/:token`, `/login`, `/dashboard` (privada), `/forgot-password`, `/reset-password/:token`, `/logout`. Si escribes `/dashboard` directamente sin sesión, redirige a `/login`.

`config/passport.js` implementa `serializeUser` y `deserializeUser`. El usuario tiene `email`, `password` (bcrypt), `passwordResetToken`, `passwordResetTokenExpires` y `verificado`. `Token` referencia a User y guarda token hasheado y fecha de creación; expira en 24 horas.

## Postman
Importa `postman/Red-de-Bicicletas.postman_collection.json`.
- POST `/api/auth/login` con JSON `{"email":"demo@bicicletas.com","password":"Bicicletas123!"}` devuelve JWT.
- Copia el token en `Authorization: Bearer <token>` para los recursos.
- GET `/api/bicicletas` sin token responde 401.
- CRUD protegido: GET `/api/bicicletas`, GET `/api/bicicletas/:id`, POST, PUT y DELETE.

La colección incluye login correcto, login incorrecto, consulta con JWT y consulta sin JWT. El login correcto guarda automáticamente el JWT en la variable `token`.

## Pruebas
Ejecuta `npm test`. Incluye pruebas del modelo bicicleta. En MongoDB Compass conecta a `mongodb://127.0.0.1:27017`; las colecciones se crean al insertar los primeros documentos.
