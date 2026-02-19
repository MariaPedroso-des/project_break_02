// Herramientas para operar con MongoDB. 
// Aquí definimos qué es un producto utilizando mongoose.

const mongoose = require('mongoose');

const validColors = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris']
const validCategory = ['Ropa', 'Gorras', 'Accesorios', 'Vinilos']
const validSize = ['XS', 'S', 'M', 'L', 'XL']

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    // required: true,
    minlength: 3,
    trim: true
  },
  description: { 
    type: String, 
    // required: true,
    trim: true
  },
  image: {                   // Si tengo tiempo, hacer un array con varias imágenes por producto.
    type: String,
    // required: true,
    trim: true
  },
  imagePublicId: {
    type: String,
  },
  color: { 
    type: String, 
    enum: validColors, 
  },
  category: { 
    type: String, 
    enum: validCategory, 
    // required: true,
  },
  size: { 
    type: String,
    enum: validSize
  },
  price: { 
    type: Number, 
    // required: true, 
    min: 0.01
  },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  Product,
  validColors,
  validCategory,
  validSize
}