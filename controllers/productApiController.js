// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML
const Product = require('../models/Product.js')
const cloudinary = require('../config/cloudinary.js')
const getProductCards = require('../helpers/getProductCards.js')
const baseHtml = require('../helpers/baseHtml.js')

const controllerProduct = {
  async showProducts (req, res) {
    try {
      const products = await Product.find()
      const productsCards = getProductCards(products)
      const html = baseHtml({title: 'Dashboard', isDashboard: true, content: productsCards })
      console.log(html)
      
    } catch (error) {
      res.status(500).send('error to show products', error)
    }
  },

  async showProductById (req, res) {
    try {

    } catch (error) {

    }

  },

  async createProduct (req, res) {
    try {
      if(!req.file) {
        return res.status(400).json({ error: 'image is required' })
      }

      const imageUp = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tienda-ProjectBreak02'
      })

      const creatingProduct = await Product.create({
        name: req.body.name,
        description: req.body.drescription,
        image: imageUp.secure_url,
        color: req.body.color,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price
      })
      res.status(201).json(creatingProduct)

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'error creating product' })
    }
  },

}

module.exports = controllerProduct