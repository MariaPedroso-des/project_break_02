// Herramientas para operar con MongoDB. 
// Aquí definimos qué es un producto.

const mongoose = require('mongoose');

const validColors = ['rojo', 'azul', 'verde', 'negro', 'blanco', 'gris']
const validCategory = ['ropa', 'gorras', 'accesorios', 'vinilos']
const validSize = ['XS', 'S', 'M', 'L', 'XL']

const ProductSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      minlength: 3,
      trim: true
    },
    description: { 
      type: String, 
      required: true,
      trim: true
    },
    image: {                   // Si tengo tiempo, hacer un array con varias imágenes por producto.
      type: String,
      trim: true
    },
    color: { 
      type: String, 
      enum: validColors, 
      required: true,
    },
    category: { 
      type: String, 
      enum: validCategory, 
      required: true,
    },
    size: { 
      type: String,
      enum: validSize, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0.01
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product

// Por si me hacen falta en otro archivo
module.exports.validColors = validColors;
module.exports.validCategory = validCategory;
module.exports.validSize = validSize;