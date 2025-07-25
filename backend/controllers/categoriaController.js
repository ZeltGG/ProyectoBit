const Categoria = require('../Models/Categoria');

// Crear categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
    }

    const existe = await Categoria.findOne({ nombre: nombre.trim() });
    if (existe) {
      return res.status(409).json({ message: 'La categoría ya existe.' });
    }

    const nuevaCategoria = await Categoria.create({
      nombre: nombre.trim(),
      descripcion
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías.' });
  }
};

// Obtener una categoría por ID
const obtenerCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada.' });

    res.json(categoria);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ message: 'Error al obtener categoría.' });
  }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada.' });

    res.json(categoria);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría.' });
  }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada.' });

    res.json({ message: 'Categoría eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría.' });
  }
};

// Exportar todas las funciones correctamente
module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria
};