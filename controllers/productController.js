// Lógica para manejar solicitudes CRUD de los productos.
// Devuelve HTML

exports.createProduct = async (req, res) => {
  try{

    const imageUp = await cloudinary.uploader.upload(req.file.path, {
      folder: 'tienda-ProjectBreak02'
    })

    const newProduct = await Product.create({
      name: req.body.name,
      drescription: req.body.drescription,
      image: imageUp.secure_url,
      color: req.body.color,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price
    })
    res.status(201).json(newProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'error creating product' })
  }
}