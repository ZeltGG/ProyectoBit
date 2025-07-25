const { Router } = require('express');
const { authRequired } = require('../middlewares/authMiddleware');
const {
  crearPublicacion,
  obtenerPublicaciones,
  obtenerPublicacion,
  actualizarPublicacion,
  eliminarPublicacion
} = require('../controllers/publicacionController');

const router = Router();

// CRUD de publicaciones
router.post('/', authRequired, crearPublicacion);      // Crear publicación
router.get('/', obtenerPublicaciones);                // Obtener todas
router.get('/:id', obtenerPublicacion);               // Obtener una
router.put('/:id', authRequired, actualizarPublicacion);  // Actualizar
router.delete('/:id', authRequired, eliminarPublicacion); // Eliminar

module.exports = router;