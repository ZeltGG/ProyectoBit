const jwt = require('jsonwebtoken');

exports.authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [bearer, token] = authHeader.split(' ');

  if (!token || bearer !== 'Bearer') {
    return res.status(401).json({ ok: false, message: 'Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { uid: decoded.uid }; 
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Token inválido o expirado.' });
  }
};