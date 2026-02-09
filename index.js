const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const { dbConnection } = require('./config/db.js')
dbConnection()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})


app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))