//Con este helper limpiamos el controller para que este solo controle el flujo. Aquí irá el formulario. Escalable, misma lógica que con getProdctuCards y baseHtml

const getProductForm = ({ product = {}, validCategory, validColors, validSize }) => {

  const colorOp = validColors
    .map(color => `<option value='${color}' ${color === product.color ? 'selected' : ''}>${color}</option>`)
    .join('')
  const categoryOp = validCategory
    .map(category => `<option value='${category}' ${category === product.category ? 'selected' : ''}>${category}</option>`)
    .join('')
  const sizeOp = validSize
    .map(size => `<option value='${size}'${size === product.size ? 'selected' : ''}>${size}</option>`)
    .join('')
//-- PUT no lo reconoce el HTML, por eso se pone POST, y más abajo PUT con hidden_method para que no aparezcan los datos en la url --
  return `
    <section class="formCreate">
      <h2>${product._id ? 'Editar producto' : 'Nuevo producto'}</h2>

      <form method="POST" action="/dashboard/${product._id}" enctype="multipart/form-data"> 
        ${product._id ? `<input type="hidden" name="_method" value="PUT">` : ''}
          <fieldset>
            <div>
              <label>Nombre del producto*</label>
              <input type="text" name="name" value="${product.name || ''}" placeholder="nombre visible del producto" required/>
            </div>
            <div>
              <label>Descripción*</label>
              <textarea type="text" name="description" placeholder="Breve descripción del nuevo producto" required>${product.description || ''}</textarea>
            </div>
              <label>Imagen actual</label>
              ${product.image ? `<img class="imgForm" src="${product.image}" alt="${product.description}">` : ''}
              <label>Actualizar imagen</label>
              <input type="file" name="image" accept="image/jpg, image/jpeg, image/png, image/webp">
            <div>
              <label>Categoría*</label>
              <select name="category">${categoryOp}</select>  
            </div>
            <div>
              <label>Color<h6>*solo si es necesario</h6></label>
              <select name="color">${colorOp}</select>
            </div>
            <div>
              <label>Talla<h6>*solo si es necesario</h6></label>
              <select name="size">${sizeOp}</select>
            </div>
            <div>
              <label>Precio*</label>
              <input type="number" step="0.01" value="${product.price || '0.01'}" name="price" required>
            </div>
            <section>
              <input type="reset" value="Limpiar formulario"/>
              <input type="submit" value="${product._id ? 'Actualizar producto' : 'Crear producto'}"/>
            </section>
          </fieldset>
      </form>
    </section>
  ` 
}

module.exports = getProductForm