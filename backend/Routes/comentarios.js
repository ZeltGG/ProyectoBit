const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
  res.send('Ruta de comentarios funcionando');
});

module.exports = router;