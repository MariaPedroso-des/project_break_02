
// CREO PRODUCTO, 
// GUARDO IMG EN REQ.FILE.PATH,
// RETURN RESPONSE

//CON TRY Y CACTH!!

exports.createProduct = async (req, res) => {
  const imgUrl = req.file.path                          //aquí está la URL que si llega  a controllers es que el middleware ya ha subido la imagen

}