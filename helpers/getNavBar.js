//Genera la barra de navegación con las categorias. Diferente para dashboard

const getNavBar = ({ isDashboard = false } = {}) => {

  const basePath = isDashboard ? '/dashboard' : '/'

  return `
    <nav>
      <a href="">Inicio</a>
      <a href="/products">Productos</a>
      <a href="/ropa">Ropa</a>
      <a href="/gorras">Gorras</a>
      <a href="/accesorios">Accesorios</a>
      <a href="/vinilos">Vinilos</a>

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