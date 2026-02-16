// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML
const Product = require('../models/Product.js')
const cloudinary = require('../config/cloudinary.js')
const getProductCards = require('../helpers/getProductCards.js')
const baseHtml = require('../helpers/baseHtml.js')

//     // showProducts    // GET Vista con todos los products
// showNewProduct  // GET Vista con el formulario para subir un nuevo product 
// // createProduct   // GET Crea un producto y redirige al showProductById 
// // showProductById // GET Vista del producto con boton para EDIT y DELETE
// showEditProduct // GET Vista para editar producto dentro del productId
// updateProduct   // PUT Actualiza y redirige al showProductById
// deleteProduct   // DELETE Elimina y redirige al showProductById

// -GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
//       showProducts: Devuelve la vista con todos los productos.

// -GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
// -      showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo. 

// -POST /dashboard/form: Crea un nuevo producto.
// -       createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

// -GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
// -     showProductById: Devuelve la vista con el detalle de un producto.

//  GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
// -       showEditProduct: Devuelve la vista con el formulario para editar un producto.

// -PUT /dashboard/:productId: Actualiza un producto.
// -      updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

// -DELETE /dashboard/:productId/delete: Elimina un producto.
// -     deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.



const controllerProduct = {
  async showProducts (req, res) {
    try {

      const isDashboard = req.isDashboard
      const products = await Product.find()
      const productCards = getProductCards(products, { isDashboard: req.isDashboard })

      const html = baseHtml({
        title: isDashboard ? 'Dashboard' : 'Tienda',
        isDashboard,
        content:
        `
          <section class="headerCreate">
            <h2>${isDashboard ? 'Tablero de edición' : 'Productos'}</h2>
            ${isDashboard ? `<a class="btnCreate" href="/new">Añade un nuevo producto</a>` : ''}
          </section>
          <section>
            ${productCards}
          </section>
        ` 
      })
      // console.log(html)

      res.send(html)
      
    } catch (error) {
        res.status(500).send('error to show products')
    }
  },
  
  async showNewProduct (req, res) {
    try {

      const html = baseHtml({
        title: 'Nuevo producto',
        isDashboard, 
        content: 
        `


        ` 
      })

      res.redirect(`/dashboard/${product._id}`)
    } catch (error) {
        res.status(500).send('error to show product')
    }
  },

  async showProductById (req, res) {    //Devuelve la vista con el detalle de un producto
    try {
      const product = await Product.findById(req.params.productId)
      
      if(!product) {
        return res.status(404).send('product not found')
      }

      const productCard = getProductCards([product], { isDashboard: true })
      const html = baseHtml({ title: product.name, isDashboard: true, content: productCard })
      console.log(html)

      res.send(html)

    } catch (error) {
        res.status(500).send('error to show product')
    }

  },

  async createProduct (req, res) {
    try {
      console.log(req.body)
      const { name, description, image, color, category, size, price } = req.body

      // if(!name || !description || !category || !price) {
      //   return res.status(400).send('Faltan campos obligatorios')
      // }

      // const imageUp = await cloudinary.uploader.upload(req.file.path, {
      //   folder: 'tienda-ProjectBreak02'
      // })

      const newProduct = await Product.create({
        name,
        description,
        image,
        color,
        category,
        size,
        price,
      })
      res.redirect(`/dashboard/${newProduct._id}`)

    } catch (err) {
      console.error(err)
      res.status(500).send('Error al subir un nuevo producto')
    }
  },

}

module.exports = controllerProduct