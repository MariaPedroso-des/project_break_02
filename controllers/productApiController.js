// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML
const { Product, validColors, validCategory, validSize } = require('../models/Product.js')


const showProducts = async (req, res) => {
  try {
  const products = await Product.find()
  res.json({
    count: products.length,
    products,
  })
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
  }
}
  
const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(product)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true
      }
    )
    if(!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(product)    
  } catch (error) {
      res.status(500).send({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product) {
    return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json({ message: 'Producto eliminado correctamente' })
  }catch (error) {
    res.status(500).send({ error: error.message })  
  }
}

module.exports = {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct
}