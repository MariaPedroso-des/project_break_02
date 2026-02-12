// Inicia express, importa rutas
// Recibe archivos estáticos
// Lee el body de las peticiones de formularios, formularios que no soportan imgs, por eso cloudinary

const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const productsApiRoutes = require('./routes/productApiRoutes.js')

const mongoose = require('mongoose')

const { dbConnection } = require('./config/db.js')


const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Ruta inicial producto
app.use('/dashboard', productsApiRoutes)

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

//Quiero que la base de datos inicie antes que el servidor. Si se hace una petición antes de que Mongo conecte, puede fallar
const startServer = async () => {
  try {
    await dbConnection()
    console.log(mongoose.connection.readyState)
    app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))
  }
  catch (err) {
    console.error('Error to start app', err)
  }
}
startServer()