

// async createProduct (req, res) {       // Devuelve la vista para crear un producto, una vez creado redirige a showProductById
//     try {
//       if(!req.file) {
//         return res.status(400).json({ error: 'image is required' })
//       }

//       const imageUp = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'tienda-ProjectBreak02'
//       })

//       const creatingProduct = await Product.create({
//         name: req.body.name,
//         description: req.body.drescription,
//         image: imageUp.secure_url,
//         color: req.body.color,
//         category: req.body.category,
//         size: req.body.size,
//         price: req.body.price
//       })
//       res.status(201).json(creatingProduct)

//     } catch (err) {
//       console.error(err)
//       res.status(500).json({ error: 'error creating product' })
//     }
//   },