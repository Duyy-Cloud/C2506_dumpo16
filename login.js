const btn = document.getElementById("loginBtn");

    btn.onclick = function() {
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value.trim();
      const error = document.getElementById("error");

      if (email === "admin@example.com" && pass === "123456") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "admin.html";
      } else if (email === "user@example.com" && pass === "123456") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "user");
        window.location.href = "home.html";
      } else {
        error.textContent = "Invalid email or password!";
      }
    }

    
    const role = localStorage.getItem("role");
    if (localStorage.getItem("loggedIn") === "true") {
      if (role === "admin") window.location.href = "admin.html";
      if (role === "user") window.location.href = "home.html";
    }
