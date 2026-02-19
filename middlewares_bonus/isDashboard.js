function isDashboard(req, res, next) {
  req.isDashboard = req.path.startsWith('/dashboard')
  next()
}

module.exports = isDashboard