Proyecto Blog – Backend con Node.js, Express y MongoDB
Descripción
Este proyecto implementa el backend de un sistema de blog. Permite la gestión de usuarios, publicaciones, categorías y comentarios. Se construyó con Node.js, Express, MongoDB y JWT para autenticación.

Tecnologías utilizadas
Node.js

Express.js

MongoDB con Mongoose

JWT (JSON Web Token) para autenticación

bcryptjs para encriptar contraseñas

dotenv para manejar variables de entorno

cors para permitir solicitudes desde el frontend

Instalación y configuración
1. Clonar el repositorio

git clone <url-del-repositorio>
cd backend

2. Instalar dependencias

npm install
3. Configurar variables de entorno
Crea un archivo .env en la carpeta backend/ con el siguiente contenido:


MONGO_URI=mongodb://localhost:27017/proyectoblog
PORT=4000
JWT_SECRET=mi_secreto_super_seguro
JWT_EXPIRES_IN=7d
4. Ejecutar el servidor

npm run dev
El servidor estará corriendo en http://localhost:4000.