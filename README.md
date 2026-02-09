-- INICIALIZAR PROYECTO
npm install -y
npm install express mongoose dotenv method-override
npm install --save-dev nodemon

  -- Añadir scripts en packege.json:
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