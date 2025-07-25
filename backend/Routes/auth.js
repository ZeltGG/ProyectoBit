const { Router } = require('express');
const { register, login, me } = require('../controllers/authController');
const { authRequired } = require('../middlewares/authMiddleware');

const router = Router();

// Ruta de prueba (mantener si quieres)
router.get('/test', (req, res) => {
  res.json({ ok: true, message: 'Auth route funcionando 👌' });
});

// Auth reales
router.post('/register', register);
router.post('/login', login);
router.get('/me', authRequired, me);

module.exports = router;