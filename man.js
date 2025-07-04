// Simple store data
const products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Jeans", price: 40 },
  { id: 3, name: "Sneakers", price: 60 }
];

// Utility functions for localStorage cart
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// --------- Login page ----------
if (document.getElementById('loginBtn')) {
  document.getElementById('loginBtn').onclick = () => {
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }
    // Save logged-in phone (simulate login)
    localStorage.setItem('phone', phone);
    alert("Logged in as " + phone);
    window.location.href = "products.html";
  }
}

// --------- Products page ----------
if (document.getElementById('products')) {
  const productsDiv = document.getElementById('products');
  products.forEach(p => {
    const prodDiv = document.createElement('div');
    prodDiv.innerHTML = `<strong>${p.name}</strong> - $${p.price} 
      <button data-id="${p.id}">Add to Cart</button>`;
    productsDiv.appendChild(prodDiv);
  });

  productsDiv.onclick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = Number(e.target.dataset.id);
      const cart = getCart();
      const product = products.find(p => p.id === id);
      cart.push(product);
      saveCart(cart);
      alert(`${product.name} added to cart`);
    }
  }

  document.getElementById('goToCart').onclick = () => {
    window.location.href = 'cart.html';
  }
}

// --------- Cart page ----------
if (document.getElementById('cartItems')) {
  const cartItemsDiv = document.getElementById('cartItems');
  const cart = getCart();
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, i) => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = `${item.name} - $${item.price}`;
      cartItemsDiv.appendChild(itemDiv);
    });
  }

  document.getElementById('buyBtn').onclick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = 'pay.html';
  }
}

// --------- Payment page ----------
if (document.getElementById('paymentForm')) {
  document.getElementById('paymentForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful! Thank you for your purchase.");
    localStorage.removeItem('cart');
    window.location.href = 'products.html';
  }
}
