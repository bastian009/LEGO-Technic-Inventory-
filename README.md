# LEGO Technic Inventory Calculator — Netlify

## Qué incluye
- La aplicación HTML original adaptada para usar un proxy seguro de Rebrickable.
- Función serverless `/.netlify/functions/rebrickable`.
- La clave API permanece en una variable privada de Netlify; no se escribe en el HTML ni en el navegador.

## Publicación (sin instalar programas)
1. Crea una cuenta gratuita en GitHub y un repositorio nuevo, por ejemplo `technic-inventory`.
2. Sube **todo el contenido de esta carpeta** al repositorio, conservando `index.html`, `netlify.toml` y la carpeta `netlify/functions/`.
3. Crea una cuenta en Netlify y elige **Add new project / Import an existing project**.
4. Conecta GitHub y selecciona el repositorio `technic-inventory`.
5. En la configuración de variables de entorno del sitio, agrega:
   - Key: `REBRICKABLE_API_KEY`
   - Value: tu clave API personal de Rebrickable.
6. Despliega el sitio. Netlify te entregará una URL HTTPS `https://....netlify.app`.
7. Abre esa URL en Safari. Puedes usar Compartir → Añadir a pantalla de inicio.

## Seguridad y datos
- Nunca pongas la clave API en `index.html`, GitHub ni en un mensaje.
- Si la clave ya estuvo expuesta públicamente, revócala y genera otra.
- La colección se guarda en `localStorage` del navegador/dispositivo. No se sincroniza automáticamente entre dispositivos. Usa la exportación JSON para hacer copias de seguridad.
- Las consultas de Rebrickable se ejecutan desde una función de Netlify para evitar exponer la clave y evitar que el navegador llame directamente a la API.

## Limitaciones heredadas de esta versión
- La pestaña de comparación consulta el inventario de un **set oficial de Rebrickable** por número. No descarga automáticamente la lista de piezas de un MOC personalizado de Rebrickable.
- La comparación por color y el resto de la lógica se conservan del HTML que proporcionaste; conviene validar resultados con un set conocido antes de depender de ellos para una construcción.
- React/Tailwind/Babel se cargan desde CDN, por lo que la primera carga necesita Internet.
