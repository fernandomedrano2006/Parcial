const API_URL = 'http://localhost:4000/api';

function renderProductCard(producto) {
  return `
    <article class="card">
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <div class="card-body">
        <h3>${producto.titulo}</h3>
        <p class="meta">${producto.autor} · ${producto.formato}</p>
        <div class="price">S/ ${producto.precio}</div>
        <div class="card-actions">
          <a class="btn btn-secondary" href="detalle.html?id=${producto.id}">Ver detalle</a>
          <button class="btn btn-primary add-to-cart" data-id="${producto.id}">Añadir</button>
        </div>
      </div>
    </article>
  `;
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('booknestCart') || '[]');
  const exists = cart.includes(productId);

  if (!exists) {
    cart.push(productId);
    localStorage.setItem('booknestCart', JSON.stringify(cart));
  }

  const button = document.querySelector(`[data-id="${productId}"]`);
  if (button) {
    button.textContent = 'Añadido';
    button.disabled = true;
  }
}

async function fetchProducts() {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error('Error al cargar productos');
  return response.json();
}

async function fetchHistorial(usuarioId = 1) {
  const response = await fetch(`${API_URL}/historial/${usuarioId}`);
  if (!response.ok) throw new Error('Error al cargar historial');
  return response.json();
}

async function loadHomeFeatured() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  try {
    const productos = await fetchProducts();
    const destacados = productos.slice(0, 4);
    container.innerHTML = destacados.map(renderProductCard).join('');

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
    });
  } catch (error) {
    container.innerHTML = '<p>No se pudo cargar el catálogo destacado.</p>';
  }
}

async function loadCatalog() {
  const container = document.getElementById('catalog-products');
  if (!container) return;

  try {
    const productos = await fetchProducts();
    container.innerHTML = productos.map(renderProductCard).join('');

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
    });
  } catch (error) {
    container.innerHTML = '<p>No se pudo cargar el catálogo.</p>';
  }
}

async function loadDetail() {
  const detailContainer = document.getElementById('product-detail');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    detailContainer.innerHTML = '<p>No se indicó un producto.</p>';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    if (!response.ok) throw new Error('Producto no encontrado');
    const producto = await response.json();

    detailContainer.innerHTML = `
      <div class="detail-layout">
        <img src="${producto.imagen}" alt="${producto.titulo}" class="detail-image" />
        <div class="detail-info">
          <p class="tag">${producto.formato}</p>
          <h1>${producto.titulo}</h1>
          <p class="meta">${producto.autor}</p>
          <p class="price-detail">S/ ${producto.precio}</p>
          <p>${producto.descripcion}</p>
          <ul>
            <li><strong>Género:</strong> ${producto.genero}</li>
            <li><strong>Stock:</strong> ${producto.stock}</li>
            <li><strong>Popularidad:</strong> ${producto.popularidad}/5</li>
          </ul>
          <button class="btn btn-primary add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
        </div>
      </div>
    `;

    const button = document.querySelector('.add-to-cart');
    if (button) {
      button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
    }
  } catch (error) {
    detailContainer.innerHTML = '<p>No se pudo cargar el detalle del producto.</p>';
  }
}

async function loadHistorial() {
  const container = document.getElementById('historial-lista');
  if (!container) return;

  try {
    const historial = await fetchHistorial(1);
    container.innerHTML = historial
      .map(
        (item) => `
          <div class="item">
            <strong>Libro ID:</strong> ${item.libroId}<br />
            <strong>Progreso:</strong> ${item.progreso}%<br />
            <strong>Estado:</strong> ${item.estado}
          </div>
        `
      )
      .join('');
  } catch (error) {
    container.innerHTML = '<p>No se pudo cargar el historial.</p>';
  }
}

async function loadCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  try {
    const productos = await fetchProducts();
    const cartIds = JSON.parse(localStorage.getItem('booknestCart') || '[]');
    const cartProducts = productos.filter((p) => cartIds.includes(p.id));

    if (cartProducts.length === 0) {
      container.innerHTML = '<p>Tu carrito está vacío.</p>';
      return;
    }

    const total = cartProducts.reduce((sum, p) => sum + Number(p.precio), 0);
    container.innerHTML = cartProducts
      .map(
        (producto) => `
          <div class="cart-item">
            <div>
              <strong>${producto.titulo}</strong>
              <p>${producto.autor}</p>
            </div>
            <span>S/ ${producto.precio}</span>
          </div>
        `
      )
      .join('');

    document.getElementById('cart-total').textContent = `S/ ${total.toFixed(2)}`;
  } catch (error) {
    container.innerHTML = '<p>No se pudo cargar el carrito.</p>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadHomeFeatured();
  loadCatalog();
  loadDetail();
  loadHistorial();
  loadCart();
});
