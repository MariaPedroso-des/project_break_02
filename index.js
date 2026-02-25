// Inicia express, importa rutas
// Recibe archivos estáticos
// Lee el body de las peticiones de formularios, formularios que no soportan imgs, por eso cloudinary

// Aseguramos el .env
const dotenv = require('dotenv')
dotenv.config()

// Conectamos express
const express = require('express')
const app = express()

//Base de datos
const { dbConnection } = require('./config/db.js')
//Api
const productApiRoutes = require('./routes/productApiRoutes.js')

//Necesario para SSR
const methodOverride = require('method-override')
const productsSSRRoutes = require('./routes/productSSRRoutes.js')

const PORT = process.env.PORT || 3000

//Middlewares generales
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Antes que las rutas que lo utilizan
app.use(methodOverride('_method'))
//CSS 
app.use(express.static('public'))

// Middleware específico solo para dashboard
const isDashboard = require('./middlewares_bonus/isDashboard.js')

//Ruta inicial SSR
app.use('/', isDashboard, productsSSRRoutes)

//Ruta Api REST
app.use('/api', productApiRoutes)

//Base de datos que inicia antes que el servidor
const startServer = async () => {
  try {
    await dbConnection()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  }
  catch (err) {
    console.error('Error to start app', err)
  }
}
startServer()