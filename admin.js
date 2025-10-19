if (localStorage.getItem("loggedIn") !== "true" || localStorage.getItem("role") !== "admin") {
    window.location.href = "login.html";
  }

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.onclick = function() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    window.location.href = "login.html";
  };


  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userTable = document.getElementById("userTable");
  const userForm = document.getElementById("userForm");

  function renderUsers() {
    userTable.innerHTML = "";
    users.forEach((u, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          <button class="edit" onclick="editUser(${i})">Edit</button>
          <button class="delete" onclick="deleteUser(${i})">Delete</button>
        </td>`;
      userTable.appendChild(row);
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  userForm.onsubmit = e => {
    e.preventDefault();
    const name = userName.value.trim();
    const email = userEmail.value.trim();
    const role = userRole.value;
    const index = editUserIndex.value;

    if (index === "") {
      users.push({ name, email, role });
    } else {
      users[index] = { name, email, role };
      editUserIndex.value = "";
    }
    userForm.reset();
    renderUsers();
  };

  window.editUser = i => {
    const u = users[i];
    userName.value = u.name;
    userEmail.value = u.email;
    userRole.value = u.role;
    editUserIndex.value = i;
  };

  window.deleteUser = i => {
    if (confirm("Delete this user?")) {
      users.splice(i, 1);
      renderUsers();
    }
  };

  
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productTable = document.getElementById("productTable");
  const productForm = document.getElementById("productForm");

  function renderProducts() {
    productTable.innerHTML = "";
    products.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.description}</td>
        <td><img src="${p.image || 'https://via.placeholder.com/80'}" width="80"></td>
        <td>
          <button class="edit" onclick="editProduct(${i})">Edit</button>
          <button class="delete" onclick="deleteProduct(${i})">Delete</button>
        </td>`;
      productTable.appendChild(row);
    });
    localStorage.setItem("products", JSON.stringify(products));
  }

  productForm.onsubmit = e => {
    e.preventDefault();
    const name = productName.value.trim();
    const price = productPrice.value;
    const description = productDesc.value.trim();
    const image = productImage.value.trim();
    const index = editProductIndex.value;

    if (index === "") {
      products.push({ name, price, description, image });
    } else {
      products[index] = { name, price, description, image };
      editProductIndex.value = "";
    }
    productForm.reset();
    renderProducts();
  };

  window.editProduct = i => {
    const p = products[i];
    productName.value = p.name;
    productPrice.value = p.price;
    productDesc.value = p.description;
    productImage.value = p.image;
    editProductIndex.value = i;
  };

  window.deleteProduct = i => {
    if (confirm("Delete this product?")) {
      products.splice(i, 1);
      renderProducts();
    }
  };

  renderUsers();
  renderProducts();
