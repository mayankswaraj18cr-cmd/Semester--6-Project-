const products = [
  { id: 1, name: 'Mobile Phone', price: 15000, qty: 12, icon: '📱' },
  { id: 2, name: 'Bluetooth Headphones', price: 1999, qty: 30, icon: '🎧' },
  { id: 3, name: 'Laptop Bag', price: 899, qty: 45, icon: '🎒' },
  { id: 4, name: 'Smart Watch', price: 3499, qty: 18, icon: '⌚' },
];

const users = [{ email: 'mayank@store.com', password: 'pass123', name: 'Mayank' }];
const cart = [];
const orders = [];
let nextOrderId = 501;
let nextProductId = 5;
let loggedInUser = null;

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `status-msg show status-${type}`;
}

function findCartItem(productId) {
  return cart.find((item) => item.productId === productId);
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products.forEach((product) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <div class="product-info">
        <div class="pname">${product.name}</div>
        <div class="pprice">${formatCurrency(product.price)}</div>
        <div class="pqty">${product.qty} in stock</div>
      </div>
      <button class="add-btn" data-id="${product.id}" ${product.qty === 0 ? 'disabled' : ''}>
        ${product.qty === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    `;
    grid.appendChild(item);
  });

  grid.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products.find((item) => item.id === Number(button.dataset.id));
      const item = findCartItem(product.id);
      const quantityInCart = item ? item.qty : 0;

      if (quantityInCart >= product.qty) return;
      if (item) item.qty += 1;
      else cart.push({ productId: product.id, qty: 1 });

      button.textContent = 'Added';
      setTimeout(() => { button.textContent = 'Add to Cart'; }, 900);
    });
  });
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalRow = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutBtn');
  document.getElementById('checkoutStatus').classList.remove('show');

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-note">Your cart is empty. Browse products to add items.</div>';
    totalRow.style.display = 'none';
    checkoutButton.style.display = 'none';
    return;
  }

  container.innerHTML = '';
  let total = 0;
  cart.forEach((cartItem) => {
    const product = products.find((item) => item.id === cartItem.productId);
    const lineTotal = product.price * cartItem.qty;
    total += lineTotal;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div>
        <div class="cname">${product.name}</div>
        <div class="cprice">${formatCurrency(product.price)} x ${cartItem.qty} = ${formatCurrency(lineTotal)}</div>
      </div>
      <div class="qty-ctrl">
        <button data-action="dec" data-id="${product.id}">-</button>
        <span>${cartItem.qty}</span>
        <button data-action="inc" data-id="${product.id}">+</button>
      </div>
    `;
    container.appendChild(item);
  });

  container.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = Number(button.dataset.id);
      const cartItem = findCartItem(productId);
      const product = products.find((item) => item.id === productId);

      if (button.dataset.action === 'inc' && cartItem.qty < product.qty) cartItem.qty += 1;
      if (button.dataset.action === 'dec') cartItem.qty -= 1;
      if (cartItem.qty <= 0) cart.splice(cart.indexOf(cartItem), 1);
      renderCart();
    });
  });

  totalRow.style.display = 'flex';
  document.getElementById('cartTotalAmount').textContent = formatCurrency(total);
  checkoutButton.style.display = 'block';
}

function renderOrders() {
  const list = document.getElementById('ordersList');
  if (orders.length === 0) {
    list.innerHTML = '<div class="empty-note">No orders yet. Place an order from your cart.</div>';
    return;
  }

  list.innerHTML = '';
  orders.slice().reverse().forEach((order) => {
    const item = document.createElement('div');
    item.className = 'order-card';
    item.innerHTML = `
      <div class="oid">Order #${order.orderId}</div>
      <div class="oname">${order.productName} x ${order.qty} - ${formatCurrency(order.total)}</div>
      <span class="ostatus">${order.status}</span>
    `;
    list.appendChild(item);
  });
}

function renderAdmin() {
  const table = document.getElementById('adminTable');
  table.innerHTML = '<tr><th>Product</th><th>Price</th><th>Qty</th><th></th></tr>';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>${product.qty}</td>
      <td><button class="btn-secondary btn-danger" data-del="${product.id}" style="padding:5px 9px; font-size:10.5px;">Delete</button></td>
    `;
    table.appendChild(row);
  });

  table.querySelectorAll('[data-del]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = Number(button.dataset.del);
      const productIndex = products.findIndex((product) => product.id === productId);
      if (productIndex >= 0) products.splice(productIndex, 1);
      renderAdmin();
      renderProducts();
    });
  });
}

document.getElementById('navTabs').addEventListener('click', (event) => {
  const button = event.target.closest('.nav-tab');
  if (!button) return;

  document.querySelectorAll('.nav-tab').forEach((tab) => tab.classList.remove('active'));
  button.classList.add('active');
  const view = button.dataset.view;
  document.querySelectorAll('.view').forEach((panel) => panel.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');

  if (view === 'products') renderProducts();
  if (view === 'cart') renderCart();
  if (view === 'orders') renderOrders();
  if (view === 'admin') renderAdmin();
});

document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const status = document.getElementById('loginStatus');
  const user = users.find((candidate) => candidate.email === email && candidate.password === password);

  if (!user) {
    showStatus(status, 'Invalid Login - check email/password', 'err');
    return;
  }

  loggedInUser = user;
  showStatus(status, `Login Success - Welcome, ${user.name}`, 'ok');
  setTimeout(() => document.querySelector('.nav-tab[data-view="products"]').click(), 500);
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const status = document.getElementById('checkoutStatus');
  if (!loggedInUser) {
    showStatus(status, 'Please log in before checkout.', 'err');
    return;
  }

  cart.forEach((cartItem) => {
    const product = products.find((item) => item.id === cartItem.productId);
    orders.push({
      orderId: nextOrderId++,
      productName: product.name,
      qty: cartItem.qty,
      total: product.price * cartItem.qty,
      status: 'Confirmed',
    });
    product.qty -= cartItem.qty;
  });

  cart.splice(0, cart.length);
  showStatus(status, 'Order Confirmed! Check the Orders tab to track it.', 'ok');
  renderCart();
});

document.getElementById('addProdBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('newProdName');
  const priceInput = document.getElementById('newProdPrice');
  const quantityInput = document.getElementById('newProdQty');
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const quantity = Number(quantityInput.value);

  if (!name || !Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity < 0) return;
  products.push({ id: nextProductId++, name, price, qty: quantity, icon: '🛍️' });
  nameInput.value = '';
  priceInput.value = '';
  quantityInput.value = '';
  renderAdmin();
  renderProducts();
});

document.getElementById('togglePhpBtn').addEventListener('click', () => {
  const box = document.getElementById('phpBox');
  const button = document.getElementById('togglePhpBtn');
  const shouldShow = box.style.display === 'none';
  box.style.display = shouldShow ? 'block' : 'none';
  button.textContent = shouldShow ? 'Hide' : 'Show';
});

renderProducts();
