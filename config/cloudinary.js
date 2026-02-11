// Configuración

require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})

module.exports = cloudinary





//FUNCIONA CON IMGS EN EL PROYECTO
// cloudinary.uploader.upload('camisetaverde.webp', { folder: 'tienda-ProjectBreak02' })
//   .then(result => {
//     console.log(result.secure_url)
//     console.log(result.public_id)
//   })
//   .catch (error => console.log(error))







//PENDIENTE CONFIGURAR
//     transformation: [
//       {
//         quality: 'auto',
//         fetch_format: 'auto'
//       },
//       {
//         width: 1200,
//         height: 1200,
//         crop: 'fill',
//         gravity: 'auto'
//       },
//   ]
//   };
