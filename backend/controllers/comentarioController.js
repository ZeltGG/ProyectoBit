const Comentario = require('../Models/Comentario');
const Publicacion = require('../Models/Publicacion');

// Crear comentario
exports.crearComentario = async (req, res) => {
  try {
    const { texto, publicacion } = req.body;

    if (!texto || !publicacion) {
      return res.status(400).json({ message: 'Texto y publicación son obligatorios.' });
    }

    // Verificar que la publicación exista
    const pub = await Publicacion.findById(publicacion);
    if (!pub) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }

    const nuevoComentario = await Comentario.create({
      texto,
      autor: req.user.uid, // Autor desde el token
      publicacion
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener comentarios por publicación
exports.obtenerComentariosPorPublicacion = async (req, res) => {
  try {
    const { publicacionId } = req.params;

    const comentarios = await Comentario.find({ publicacion: publicacionId })
      .populate('autor', 'nombre correo')
      .sort({ fecha: -1 });

    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ message: 'Error al obtener comentarios.' });
  }
};

// Actualizar comentario
exports.actualizarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado.' });

    // Validar que el autor sea el mismo
    if (comentario.autor.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'No tienes permiso para editar este comentario.' });
    }

    comentario.texto = req.body.texto || comentario.texto;
    await comentario.save();

    res.json(comentario);
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ message: 'Error al actualizar comentario.' });
  }
};

// Eliminar comentario
exports.eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado.' });

    if (comentario.autor.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario.' });
    }

    await comentario.remove();
    res.json({ message: 'Comentario eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario.' });
  }
};