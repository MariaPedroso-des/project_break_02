const express = require('express')
const router = express.Router()
const Product = require('../models/Product.js')
const upload = require('../middlewares(BONUS)/uploadCloudinaryMiddleware.js')
const cloudinary = require('../config/cloudinary.js')
const productSSRController = require('../controllers/productSSRController.js')

//Tienda
router.get('/products', productSSRController.showProducts)
router.get('/products/:productId', productSSRController.showProductById)


// -GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
//       showProducts: Devuelve la vista con todos los productos.
// -GET /products/:productId: Devuelve el detalle de un producto.
// -     showProductById: Devuelve la vista con el detalle de un producto.

//Dashboard
router.get('/dashboard', productSSRController.showProducts)
router.get('/dashboard/new', productSSRController.showNewProduct)
router.post('/dashboard/form', productSSRController.createProduct)
router.get('/dashboard/:productId', productSSRController.showProductById)
// router.get('/dashboard/:productId/edit', productSSRController.showEditProduct)
// router.put('/dashboard/:productId', productSSRController.updateProduct)
// router.delete('/dashboard/:productId/delete', productSSRController.deleteProduct)


module.exports = router
// -GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
//       showProducts: Devuelve la vista con todos los productos.

// -GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
// -      showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo. 

// -POST /dashboard: Crea un nuevo producto.
// -       createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

// -GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
// -     showProductById: Devuelve la vista con el detalle de un producto.

//  GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
// -       showEditProduct: Devuelve la vista con el formulario para editar un producto.

// -PUT /dashboard/:productId: Actualiza un producto.
// -      updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

// -DELETE /dashboard/:productId/delete: Elimina un producto.
// -     deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.