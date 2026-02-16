//getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.

//EJEMPLO

const getProductCards = (products, { isDashboard = false } = {}) => {

  const basePath = isDashboard ? '/dashboard' : '/products'

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
            <form class="formEdit" method="GET" action="${basePath}/${p._id}/edit">
              <input class="btnEdit" type="submit" value="Editar"/>
            </form>
            <form class="formDelete" method="POST" action="${basePath}/${p._id}/delete?_method=DELETE">
              <input class="btnDelete" type="submit" value="Eliminar"/>
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