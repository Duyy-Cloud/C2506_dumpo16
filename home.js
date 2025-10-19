if (localStorage.getItem("loggedIn") !== "true" || localStorage.getItem("role") !== "user") {
    window.location.href = "login.html";
  }

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    window.location.href = "login.html";
  };

  let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "T1 T-Shirt", price: 52, description: "T-Shirt", image: "https://via.placeholder.com/250x180?text=T-Shirt" },
    { name: "T1 Animal Friends Eye Mask", price: 16, description: "Eye Mask", image: "https://via.placeholder.com/250x180?text=Eye Mask" },
    { name: "T1 Logo Blanket", price: 18, description: "Blanket", image: "https://via.placeholder.com/250x180?text=Blanket" }
  ];

  localStorage.setItem("products", JSON.stringify(products));

  const productList = document.getElementById("productList");
  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">$${p.price}</p>
      <p>${p.description}</p>
      <button class="add" onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.getElementById("cartTable");
  const totalAmount = document.getElementById("totalAmount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const cartPopup = document.getElementById("cartPopup");
  const cartPopupTable = document.getElementById("cartPopupTable");

  function renderCart() {
    cartTable.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      const row = document.createElement("tr");
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity(${i}, this.value)">
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="delete" onclick="removeFromCart(${i})"> Remove</button></td>
      `;
      cartTable.appendChild(row);
    });
    totalAmount.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.updateQuantity = (index, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      cart[index].quantity = quantity;
      renderCart();
      updateCartCount();
    } else {
      alert("Quantity must be at least 1.");
    }
  };

  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function addToCart(index) {
    const product = products[index];
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCart();
    updateCartCount();
  }

  window.removeFromCart = i => {
    if (confirm("Remove this item from the cart?")) {
      cart.splice(i, 1);
      renderCart();
      updateCartCount();
    }
  };

  checkoutBtn.onclick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Checkout successful!");
    cart = [];
    renderCart();
    updateCartCount();
  };

  function toggleCartPopup() {
    if (cartPopup.style.display === "none" || cartPopup.style.display === "") {
      renderCartPopup();
      cartPopup.style.display = "block";
    } else {
      cartPopup.style.display = "none";
    }
  }

  function renderCartPopup() {
    cartPopupTable.innerHTML = "";
    cart.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      `;
      cartPopupTable.appendChild(row);
    });
  }

  cartIcon.onmouseover = () => {
    renderCartPopup();
    cartPopup.style.display = "block";
  };

  cartIcon.onmouseout = () => {
    cartPopup.style.display = "none";
  };

  cartPopup.onmouseover = () => {
    cartPopup.style.display = "block";
  };

  cartPopup.onmouseout = () => {
    cartPopup.style.display = "none";
  };

  updateCartCount();
  renderCart();