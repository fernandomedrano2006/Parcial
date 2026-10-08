# BookNest

Proyecto de librería multiformato para la evaluación parcial de DAW.

## Estructura

- `backend/`: API REST en Node.js con Express
- `frontend/`: versión mínima del frontend para consumir la API

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

Puedes abrir el archivo `frontend/index.html` en el navegador o servir la carpeta con un servidor estático.

Ejemplo:

```bash
cd frontend
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
