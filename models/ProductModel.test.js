//Con esto quiero probar mi db mongoose y mi schema product

const mongoose = require('mongoose')
const { dbConnection } = require('../config/db.js')
dbConnection()

//Importo el modelo de producto
const Product = require('./Product.js')

beforeEach( async () => {
  await Product.deleteMany({})
})

describe('Product model test', () => {
  it('should create a new product', async () => {
  Product.create( 
    {
      name: 'camiseta',
      description: 'camiseta básica de manga corta regular fit',
      image: imgUrl,
      color: 'verde',
      category: 'ropa',
      size: 'M',
      price: 30.99
   })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})