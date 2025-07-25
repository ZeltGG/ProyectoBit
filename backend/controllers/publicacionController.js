const Publicacion = require('../Models/Publicacion');

// Crear publicación
exports.crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido, categoria } = req.body;

    if (!titulo || !contenido || !categoria) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const nuevaPublicacion = await Publicacion.create({
      titulo,
      contenido,
      categoria,
      autor: req.user.uid // Autor viene del token JWT
    });

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener todas las publicaciones
exports.obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find()
      .populate('autor', 'nombre correo')
      .populate('categoria', 'nombre');

    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones.' });
  }
};

// Obtener una publicación por ID
exports.obtenerPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id)
      .populate('autor', 'nombre')
      .populate('categoria', 'nombre');

    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada.' });

    res.json(publicacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicación.' });
  }
};

// Actualizar publicación
exports.actualizarPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada.' });

    res.json(publicacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar publicación.' });
  }
};

// Eliminar publicación
exports.eliminarPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByIdAndDelete(req.params.id);
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada.' });

    res.json({ message: 'Publicación eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar publicación.' });
  }
};