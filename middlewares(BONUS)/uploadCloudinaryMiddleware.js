const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tienda-ProjectBreak02',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
})

module.exports = multer({ storage })