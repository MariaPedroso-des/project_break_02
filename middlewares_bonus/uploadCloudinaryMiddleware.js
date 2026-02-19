const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tienda-ProjectBreak02',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      {
        quality: 'auto',
        fetch_format: 'auto'
      },
      {
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'auto'
      },
    ]
  }
})

module.exports = multer({ storage })