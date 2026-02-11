const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const productsRoutes = require('./routes/productRoutes.js')

const authRoutes = require('./routes/authRoutes.js')

const app = express()

const { dbConnection } = require('./config/db.js')
dbConnection()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Ruta inicial AUTH
app.use('/dashboard', authRoutes)



app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))