# BookNest

Proyecto de librería multiformato para la evaluación parcial de DAW.

## Estructura

- `backend/`: API REST en Node.js con Express
- `public/`: frontend estático servido por Express y Vercel

## Ejecutar backend

```bash
cd backend
npm install
npm start
```

La API queda disponible en:

- http://localhost:4000/
- http://localhost:4000/api/productos
- http://localhost:4000/api/categorias
- http://localhost:4000/api/historial/1

## Ejecutar frontend

Puedes abrir el archivo `public/index.html` en el navegador o iniciar el servidor desde la raíz del proyecto.

Ejemplo:

```bash
cd public
python -m http.server 8000
```

Luego abre:

- http://localhost:8000/

## Descripción del proyecto

BookNest es una librería que vende libros físicos, e-books y audiolibros para estudiantes, jóvenes y adultos. La API es de solo lectura y utiliza JSON en memoria como fuente de datos.

## Recursos principales

- Usuarios
- Categorías
- Productos
- Pedidos
- Historial de lectura
