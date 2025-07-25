const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
  res.send('Ruta de categorías funcionando');
});

module.exports = router;