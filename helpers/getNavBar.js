//Genera la barra de navegación con las categorias. Diferente para dashboard
const validCategory = require('../models/Product.js')

const getNavBar = ({ isDashboard = false } = {}) => {

  const basePath = isDashboard ? '/dashboard' : '/products'

  return `
    <nav>
      <a href="/">Inicio</a>
      <a href="/products"></a>
      <a href="${basePath}?category=Ropa">Ropa</a>
      <a href="${basePath}?category=Gorras">Gorras</a>
      <a href="${basePath}?category=Accesorios">Accesorios</a>
      <a href="${basePath}?category=Vinilos">Vinilos</a>

      ${ isDashboard ? 
          `
          <a href="${basePath}/logout">Cerrar sesión</a>
          `
        : 
          `
          <a href="${basePath}/login">Iniciar sesión</a>
          `    
      }
    </nav>
  `}

module.exports = getNavBar