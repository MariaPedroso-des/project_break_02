// Aquí irá el HTML común a todas las páginas
const getNavBar = require('./getNavBar.js')
const getProductCards = require('./getProductCards.js')


const baseHtml = ({ title = 'Tienda-ProjectBreak02', content = getProductCards(), isDashboard = false }) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}}</title>
    <link rel="stylesheet" href="../public/styles.css">
  </head>
  <body>
    ${getNavBar({ isDashboard })}
    <main>
      ${content}
    </main>
  </body>
  </html>
`

module.exports = baseHtml