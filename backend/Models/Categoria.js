const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descripcion: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Categoria', categoriaSchema);