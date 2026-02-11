const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})

// TERMINAR FUNCION
// function  {
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

module.exports = cloudinary