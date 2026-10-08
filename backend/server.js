const express = require("express");
const cors = require("cors");

const usuarios = require("./data/usuarios.json");
const categorias = require("./data/categorias.json");
const productos = require("./data/productos.json");
const pedidos = require("./data/pedidos.json");
const historial = require("./data/historial.json");
const promociones = require("./data/promociones.json");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get(["/", "/api"], (req, res) => {
  res.json({
    message: "API BookNest funcionando correctamente",
    recursos: ["productos", "categorias", "pedidos", "promociones"],
    endpoints: [
      "/api/productos",
      "/api/productos/:id",
      "/api/categorias",
      "/api/categorias/:id",
      "/api/pedidos",
      "/api/pedidos/:id",
      "/api/promociones",
      "/api/promociones/:id",
    ],
  });
});

app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/api/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(usuario);
});

app.get("/api/categorias", (req, res) => {
  res.json(categorias);
});

app.get("/api/categorias/:id", (req, res) => {
  const id = Number(req.params.id);
  const categoria = categorias.find((c) => c.id === id);
  if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
  res.json(categoria);
});

app.get("/api/productos", (req, res) => {
  const { genero, categoriaId, formato } = req.query;
  let resultado = [...productos];

  if (genero) {
    resultado = resultado.filter(
      (p) => p.genero.toLowerCase() === String(genero).toLowerCase()
    );
  }

  if (categoriaId) {
    resultado = resultado.filter((p) => p.categoriaId === Number(categoriaId));
  }

  if (formato) {
    resultado = resultado.filter(
      (p) => p.formato.toLowerCase() === String(formato).toLowerCase()
    );
  }

  res.json(resultado);
});

app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);
  if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(producto);
});

app.get("/api/pedidos", (req, res) => {
  res.json(pedidos);
});

app.get("/api/pedidos/:id", (req, res) => {
  const id = Number(req.params.id);
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
  res.json(pedido);
});

app.get("/api/promociones", (req, res) => {
  res.json(promociones);
});

app.get("/api/promociones/:id", (req, res) => {
  const id = Number(req.params.id);
  const promocion = promociones.find((p) => p.id === id);
  if (!promocion) return res.status(404).json({ message: "Promoción no encontrada" });
  res.json(promocion);
});

app.get("/api/historial", (req, res) => {
  res.json(historial);
});

app.get("/api/historial/:usuarioId", (req, res) => {
  const usuarioId = Number(req.params.usuarioId);
  const historialUsuario = historial.filter((h) => h.usuarioId === usuarioId);
  res.json(historialUsuario);
});

app.listen(PORT, () => {
  console.log(`API BookNest ejecutándose en http://localhost:${PORT}`);
});
