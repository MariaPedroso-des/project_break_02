//Genera la barra de navegación con las categorias. Diferente para dashboard

const getNavBar = ({ isDashboard = false } = {}) =>
  `
    <nav>
      <a href="/inicio">Inicio</a>
      <a href="/products">Productos</a>
      <a href="/ropa">Ropa</a>
      <a href="/gorras">Gorras</a>
      <a href="/accesorios">Accesorios</a>
      <a href="/vinilos">Vinilos</a>

      ${ isDashboard ? 
          `
          <a href="/products/nuevo">Nuevo producto</a>
          <a href="/logout">Cerrar sesión</a>
          `
        : 
          `
          <a href="/login">Iniciar sesión</a>
          `    
      }
    </nav>
  `

module.exports = getNavBar