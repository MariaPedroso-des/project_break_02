//Con esto quiero probar mi db mongoose y mi schema product

const mongoose = require('mongoose')
const { dbConnection } = require('../config/db.js')

//Importo el modelo de producto
const Product = require('../models/Product.js')

beforeAll(async () => {
  await dbConnection()
})

beforeEach( async () => {
  await Product.deleteMany({})
})

describe('Product model test', () => {
  it('should create a new product', async () => {

    const productCreate = await Product.create({
      name: 'camiseta',
      description: 'camiseta básica de manga corta regular fit',
      image: 'https://imgUrl.com/test',
      color: 'verde',
      category: 'ropa',
      size: 'M',
      price: 30.99
   })
   expect(productCreate.name).toBe('camiseta')
   expect(productCreate.price).toBe(30.99)

   const count = await Product.countDocuments()
   expect(count).toBe(1)
  })
})


//Cierra conexión
afterAll(async () => {
  await mongoose.connection.close()
})