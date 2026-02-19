//Genera la barra de navegación con las categorias. Diferente para dashboard
const validCategory = require('../models/Product.js')

const getNavBar = ({ isDashboard = false } = {}) => {

  const basePath = isDashboard ? '/dashboard' : '/products'

  return `
    <nav>
      <a href="">Inicio</a>
      <a href="/products">Productos</a>
      <a href="${basePath}?category=ropa">Ropa</a>
      <a href="${basePath}?category=gorras">Gorras</a>
      <a href="${basePath}?category=accesorios">Accesorios</a>
      <a href="${basePath}?category=vinilos">Vinilos</a>

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