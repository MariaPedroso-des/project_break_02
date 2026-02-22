// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML
const { Product, validColors, validCategory, validSize } = require('../models/Product.js')
const cloudinary = require('../config/cloudinary.js')
const getProductCards = require('../helpers/getProductCards.js')
const baseHtml = require('../helpers/baseHtml.js')
const getProductForm = require('../helpers/formProduct.js')

const controllerProduct = {
  async showProducts (req, res) {                                                      // Si da tiempo, aplicar la misma lógica que en el form, sacando el HTML, mejor estructurado todos igual.
    try {
      const isDashboard = req.isDashboard || false
      const { category } = req.query

      const filters = {}

      if(category) {
        filters.category = category
      }

      const products = await Product.find(filters)
      const html = baseHtml({
        title: isDashboard ? 'Dashboard' : 'Tienda',
        isDashboard,
        content:
        `
          <section class="headerCreate">
            <h2>${isDashboard ? 'Tablero de edición' : 'Productos'}</h2>
            ${isDashboard ? `<a class="btnCreate" href="/dashboard/new">Añade un nuevo producto</a>` : ''}
          </section>
          <section class="sectionCards">
            ${getProductCards(products, { isDashboard })}
          </section>
        ` 
      })
      res.send(html)
      
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.status(500).send('Error al mostrar el formulario')
    }
  },

  async createProduct (req, res) {
    try {
      console.log(req.body)
      console.log(req.file)
      const { name, description, color, category, size, price } = req.body

      if(!name || !description || !category || !price) {
        return res.status(400).send('Faltan campos obligatorios')
      }

      const newProduct = await Product.create({
        name,
        description,
        image: req.file ? req.file.path : null,
        imagePublicId: req.file ? req.file.filename : null,
        color,
        category,
        size,
        price,
      })

      res.redirect(`/dashboard/${newProduct._id}`)

    } catch (err) {
      console.log(err)
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
        console.log(error)
        res.status(500).send('Error al mostrar el formulario')
    }
  },

  async showProductById (req, res) {                                 //Devuelve la vista con el detalle de un producto
    try {
      const product = await Product.findById(req.params.id)
    
      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }

      const isDashboard = req.isDashboard || false

      const html = baseHtml({ 
        title: product.name, 
        isDashboard: req.isDashboard, 
        content: `${getProductCards([product], { isDashboard: req.isDashboard })}`
      })
      res.send(html)

    } catch (error) {
        console.log(error)
        res.status(500).send('Error al intentar visualizar este producto')
    }
  },

  async updateProduct (req, res) {
    try {
      console.log(req.body)
      console.log(req.file)

      const { name, description, color, category, size, price } = req.body

      if(!name || !description || !category || !price) {
        return res.status(400).send('Faltan campos obligatorios')
      }

      const existProduct = await Product.findById(req.params.id)
      if(!existProduct) {
        return res.status(404).send('Producto no encontrado')
      } 

      const updateProduct = { name, description, color, category, size, price }
      if(req.file) {

        if(existProduct.imagePublicId) {
          await cloudinary.uploader.destroy(existProduct.imagePublicId)
        }
        updateProduct.image = req.file.path
        updateProduct.imagePublicId = req.file.filename
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
      // res.send(html)
      res.redirect(`/dashboard/${product._id}`)
      
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al intentar actualizar este producto')
    }
  },

  async deleteProduct (req, res) {
    try {
     const product = await Product.findById(req.params.id)
    
      if(!product) {
        return res.status(404).send('Producto no encontrado')
      }

      if(product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId)
      }

      await Product.findByIdAndDelete(req.params.id)

      const html = 
      `
        <script>
          alert('Producto ${product.name} eliminado correctamente')
          window.location.href="/dashboard"
        </script>
      `
      res.send(html)

    }catch (error) {
      console.log(error)
      res.status(500).send('Error al intentar borrar este producto')
    }
  },
}

module.exports = controllerProduct