//getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.

//EJEMPLO

const getProductCards = (products, { isDashboard = false } = {}) => {

  const basePath = isDashboard ? '/dashboard' : '/'

  return products.map( p => 
    `
      <div class="productCard">
        <a href="${basePath}/${p._id}" class="imgOn">
          <img src="${p.image}" alt="${p.description}">
        </a>
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <p>${p.price}€</p>
      
      ${ isDashboard ? 
          `
          <div class="dashboardBtn">
            <a href="${basePath}/${p._id}/edit">Editar</a>
            <form class="formDelete" method="POST" action="${basePath}/${p._id}/delete?_method=DELETE">
              <button class="btnDelete" type="submit">Eliminar</button>
            </form>
          </div>

          `
        : ''
      }
      </div>
    `
  ).join('')
} 


module.exports = getProductCards