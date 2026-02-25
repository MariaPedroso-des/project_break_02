-- INICIALIZAR PROYECTO
npm init -y
npm install express mongoose dotenv method-override
npm install --save-dev nodemon

  -- Añadir scripts en package.json:
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
     }

-- VARIABLES DE ENTORNO
Completar .env con MONGO_URI y PORT
CLOUDINARY


-- ARQUITECTURA DEL PROYECTO
/config       -> Conexión a BD y servicios externos
/middlewares  -> Control de contexto(público, administrador) y subida de imágenes con Cloudinary
/models       -> Definición de schemas de MongoDB
/controllers  -> Control del flujo y lógica de negocio
/routes       -> Endpoints
/helpers      -> HTML
/public       -> CSS y resto de recursos estáticos, ej. video intro


-- LEVANTAR EL SERVIDOR en index.js
    - Ruta de prueba con app.get
    - Middleware básicos:
          - Importante el orden: 
              - Json
              - Urlencoded
              - Method-override
              - Middlewares específicos
              - Rutas al final
      - app.use(express.json())
      - app.use(express.urlencoded({ extended: true }))
      - method-override para PUT y DELETE porque el form los necesita. Los formularios HTML solo soportan GET y POST


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

-- CONFIGURAR CLOUDINARY y MULTER en config/cloudinary.js y middlewares_bonus/uploadCloudinaryMiddleware.js
 npm install cloudinary multer
      - incluir CLOUD_NAME, API KEY y API SECRET en el .env
      - En config se configura el cliente
      - En middlewares_bonus se configura el almacenamiento 

-- ISDASHBOARD
    - Hace que se pueda adaptar la vista que se muestra en los helpers según el contexto gracias a la propiedad req.isDashboard
    - app.use(isDashboard) -> (middleware específico) -> ANTES DE LAS RUTAS

-- SSR. El HTML se genera dinámicamente en:
    - baseHtml
    - getNavBar
    - getProductCards
    - formProduct

-- Junto a rutas a mostrar en el navegador
-- Rutas API REST, igual al SSR pero sin mostrar nada en navegador. Devuelven JSON, lógica del backend, testing... Al separar API y SSR, facilitamos escalabilidad.

-- PUBLIC
    - app.use(express.static('public'))
    - Esto es importante a la hora de clonar el repo. Assets estáticos, permite servir video de intro o imagen de 'no imagen' además del CSS. Importante para despliegue

-- DESPLIEGUE EN RENDER
    - Utilizar MongoDB Atlas como BD remota
    - Configurado con Cloudinary


*--// Comprobación para saber si la BD está conectada. Desde index.js: imprimir console.log(mongoose.connection.readyState) DESPUÉS DE LLAMAR await dbConnection()
*--// .gitignore con .env, IP abierta, MONGO_URI en variables de entorno de Render.

-- FLUJO
    - Req llega a la ruta
    - Pasa por los middlewares, tanto isDashboard (contexto) y cloudinary si corresponde
    - Controller ejecuta la lógica con MongoDB de BD
    - HTML con los helpers
    - Envía la res renderizada