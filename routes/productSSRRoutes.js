const express = require('express')
const router = express.Router()
const { Product } = require('../models/Product.js')
const upload = require('../middlewares_bonus/uploadCloudinaryMiddleware.js')
const cloudinary = require('../config/cloudinary.js')
const productSSRController = require('../controllers/productSSRController.js')
const baseHtml = require('../helpers/baseHtml.js')

//Portada
router.get('/', (req, res) => {
  const html = baseHtml({
    title: 'Inicio',
    isDashboard: false,
    content: `
      <section class="intro">
          <video autoplay muted loop playsinline class="videoIntro">
            <source src="/video-portada.mp4" type="video/mp4">
          </video>
        <div class="introContent">
          <a href="/products" class="btnIntro">Descubrir</a>
        </div>
      </section>
    `
  })
  res.send(html)
})

//Tienda
router.get('/products', productSSRController.showProducts)
router.get('/products/:id', productSSRController.showProductById)

//Dashboard
router.get('/dashboard', productSSRController.showProducts)
router.get('/dashboard/new', productSSRController.showNewProduct)
router.get('/dashboard/:id/edit', productSSRController.showEditProduct)
router.get('/dashboard/:id', productSSRController.showProductById)

router.post('/dashboard/form', upload.single('image'), productSSRController.createProduct)
router.put('/dashboard/:id', upload.single('image'), productSSRController.updateProduct)
router.delete('/dashboard/:id/delete', productSSRController.deleteProduct)

module.exports = router