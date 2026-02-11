const express = require('express')
const router = express.Router()
const Product = require('../models/Product.js')
const upload = require('../middlewares(BONUS)/uploadCloudinaryMiddleware.js')
const cloudinary = require('../config/cloudinary.js')
const productController = require('../controllers/productController.js')

router.post('/dashboard', upload.single('image'), productController.createProduct)

module.exports = router

