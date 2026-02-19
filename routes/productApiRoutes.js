const express = require('express')
const router = express.Router()
const productApiController = require('../controllers/productApiController.js')

router.get('/', productApiController.showProducts)
router.get('/:id', productApiController.showProductById)

router.post('/form', productApiController.createProduct)
router.put('/:id', productApiController.updateProduct)
router.delete('/:id/delete', productApiController.deleteProduct)

module.exports = router