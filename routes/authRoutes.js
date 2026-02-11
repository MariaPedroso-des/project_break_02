const express = require('express')
const router = express.Router()
const cloudinary = require('../config/cloudinary.js')
const upload = require('../middlewares(BONUS)/uploadCloudinaryMiddleware.js')

const authController = require('../controllers/authController.js')

router.post('/dashboard', auth, upload.single('image'), authController.createProduct)

module.exports = router

