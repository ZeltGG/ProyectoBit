const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

const sanitizeUser = (user) => ({
  id: user._id,
  nombre: user.nombre,
  correo: user.correo,
  rol: user.rol,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const generateToken = (userId) => {
  return jwt.sign({ uid: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Validaciones mínimas
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ ok: false, message: 'Nombre, correo y contraseña son obligatorios.' });
    }

    if (contraseña.length < 6) {
      return res.status(400).json({ ok: false, message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Normalizar correo
    const email = correo.toLowerCase().trim();

    // Verificar si ya existe
    const existe = await Usuario.findOne({ correo: email });
    if (existe) {
      return res.status(409).json({ ok: false, message: 'El correo ya está registrado.' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo: email,
      contraseña: hash,
      rol: rol || 'usuario'
    });

    const token = generateToken(nuevoUsuario._id);

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente.',
      user: sanitizeUser(nuevoUsuario),
      token
    });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ ok: false, message: 'Correo y contraseña son obligatorios.' });
    }

    const email = correo.toLowerCase().trim();

    const user = await Usuario.findOne({ correo: email });
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas.' });
    }

    const token = generateToken(user._id);

    return res.json({
      ok: true,
      message: 'Login exitoso.',
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};

exports.me = async (req, res) => {
  try {
    
    const user = await Usuario.findById(req.user.uid);
    if (!user) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado.' });
    }

    return res.json({
      ok: true,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Error en me:', error);
    return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};