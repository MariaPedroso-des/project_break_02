// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML
const { Product, validColors, validCategory, validSize } = require('../models/Product.js')
const cloudinary = require('../config/cloudinary.js')
const getProductCards = require('../helpers/getProductCards.js')
const baseHtml = require('../helpers/baseHtml.js')
const getProductForm = require('../helpers/formProduct.js')

    // showProducts    // GET Vista con todos los products
// showNewProduct  // GET Vista con el formulario para subir un nuevo product 
// createProduct   // GET Crea un producto y redirige al showProductById 
// showProductById // GET Vista del producto con boton para EDIT y DELETE
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
  async showProducts (req, res) {                                                      // Si da tiempo, aplicar la misma lógica que en el form, sacando el HTML, mejor estructurado todos igual.
    try {
      const isDashboard = req.isDashboard
      const products = await Product.find()
      const html = baseHtml({
        title: isDashboard ? 'Dashboard' : 'Tienda',
        isDashboard,
        content:
        `
          <section class="headerCreate">
            <h2>${isDashboard ? 'Tablero de edición' : 'Productos'}</h2>
            ${isDashboard ? `<a class="btnCreate" href="/dashboard/new">Añade un nuevo producto</a>` : ''}
          </section>
          <section>
            ${getProductCards(products, { isDashboard })}
          </section>
        ` 
      })
      res.send(html)
      
    } catch (error) {
        res.status(500).send('Error al mostrar productos')
    }
  },
  
  async showNewProduct (req, res) {
    try {
      const html = baseHtml({ 
        title: 'Nuevo producto', 
        isDashboard: req.isDashboard, 
        content: getProductForm({ 
          validCategory, 
          validColors, 
          validSize,
          action: '/dashboard/form'
        }) 
      })
      return res.send(html)

    } catch (error) {
        res.status(500).send('Error al mostrar el formulario', error)
    }
  },

  async createProduct (req, res) {
    try {
      const { name, description, color, category, size, price } = req.body

      if(!name || !description || !category || !price) {
        return res.status(400).send('Faltan campos obligatorios')
      }

      const newProduct = await Product.create({
        name,
        description,
        image: req.file ? req.file.path : null,
        color,
        category,
        size,
        price,
      })

      res.redirect(`/dashboard/${newProduct._id}`)

    } catch (err) {
      res.status(500).send('Error al subir un nuevo producto')
    }
  },
  async showEditProduct (req, res) {
    try {
      const product = await Product.findById(req.params.id)

      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }

      const html = baseHtml({ 
        title: `Editar ${product.name}`, 
        isDashboard: req.isDashboard, 
        content: getProductForm({
          product,
          validCategory, 
          validColors, 
          validSize
        }) 
      })
      return res.send(html)

    } catch (error) {
        res.status(500).send('Error al mostrar el formulario')
    }
  },

  async showProductById (req, res) {                                 //Devuelve la vista con el detalle de un producto
    try {
      const product = await Product.findById(req.params.id)
    
      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }
      const html = baseHtml({ 
        title: product.name, 
        isDashboard: req.isDashboard, 
        content: `${getProductCards([product], { isDashboard: req.isDashboard })}`
      })
      res.send(html)

    } catch (error) {
        res.status(500).send('Error al intentar visualizar este producto')
    }
  },

  async updateProduct (req, res) {
    try {
      const { name, description, color, category, size, price } = req.body

      if(!name || !description || !category || !price) {
        return res.status(400).send('Faltan campos obligatorios')
      }

      const updateProduct = { name, description, color, category, size, price }
      if(req.file) {
        updateProduct.image = req.file.path
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateProduct, {
          new: true,
          runValidators: true,   // Opción de Mongoose que habilita la validación del esquema durante las actualizaciones porque no lo hace por defecto.
        },
      )
      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }
      const html = 
      `
      <script>
        alert('Producto actualizado correctamente')
        window.location.href="/dashboard/${product._id}"
      </script>
      `
      res.send(html)
      // res.redirect(`/dashboard/${product._id}/edit`)
      
    } catch (error) {
         res.status(500).send('Error al intentar actualizar este producto', error)
    }
  },

  async deleteProduct (req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)

      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }
      const html = 
      `
        <script>
          alert('Producto ${product.name} eliminado correctamente')
          window.location.href="/dashboard"
        </script>
      `
      res.send(html)

    }catch (error) {
      res.status(500).send('Error al intentar borrar este producto', error)
    }
  },
}

module.exports = controllerProduct