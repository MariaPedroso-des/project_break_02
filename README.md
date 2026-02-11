-- INICIALIZAR PROYECTO
npm install -y
npm install express mongoose dotenv method-override
npm install --save-dev nodemon

  -- Añadir scripts en package.json:
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
     }

-- Completar .env con MONGO_URI y PORT

-- LEVANTAR EL SERVIDOR en index.js
    - Ruta de prueba con app.get
    - Middleware básicos:
      - app.use(express.json())
      - app.use(express.urlencoded({ extended: true }))

-- CONFIGURAR BASE DE DATOS en config/db.js
    - Conecta, muestra errores y exporta función

-- CONFIGURAR QUÉ ES UN PRODUCTO en models/Product.js
    - Definir los campos que tiene el elemento producto (nombre, descripción, imagen, categoría, talla y precio). 
      - type
      - enum
      - required
      - trim (para eliminar espacios antes y después)
      - min
      - minlength
      - IMPORTANTE { timestamps: true } que será lo que añada automáticamente createdAt y updateAt en MongoDB

-- Ahora puedo hacer un test para comprobar que he generado bien Product. 
npm i -D jest -> porque no es una dependencia que necesite mi proyecto, sino una dependencia de desarrollo.

-- CONFIGURAR CLOUDINARY en config/cloudinary.js
 npm i install cloudinary, multer
      - incluir CLOUD_NAME, API KEY y API SECRET en el .env


--// Comprobación para saber si la BD está conectada. Desde index.js: imprimir console.log(mongoose.connection.readyState) DESPUÉS DE LLAMAR await dbConnection()