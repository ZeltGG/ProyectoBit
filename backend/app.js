// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas (IMPORTA PRIMERO)
const authRoutes = require('./Routes/auth');
const publicacionesRoutes = require('./Routes/publicaciones');
const categoriasRoutes = require('./Routes/categorias');
const comentariosRoutes = require('./Routes/comentarios');

// Debug para verificar que cada ruta exporta un router (función)
console.log('authRoutes:', typeof authRoutes);
console.log('publicacionesRoutes:', typeof publicacionesRoutes);
console.log('categoriasRoutes:', typeof categoriasRoutes);
console.log('comentariosRoutes:', typeof comentariosRoutes);

// (Opcional) Falla rápido si alguna no es función
function assertRouter(name, r) {
  if (typeof r !== 'function') {
    console.error(`❌ ${name} no exporta un Router válido. Recibí:`, r);
    process.exit(1);
  }
}
assertRouter('authRoutes', authRoutes);
assertRouter('publicacionesRoutes', publicacionesRoutes);
assertRouter('categoriasRoutes', categoriasRoutes);
assertRouter('comentariosRoutes', comentariosRoutes);

// Montaje de rutas
app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Healthcheck
app.get('/', (_req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, message: `Ruta no encontrada: ${req.originalUrl}` });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('💥 Error no controlado:', err);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'Error interno del servidor'
  });
});

// Conexión a MongoDB + arranque
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
start();

// Errores no controlados
process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});