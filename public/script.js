async function signup() {
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let message = document.getElementById("message");

  if (username === "") {
    message.innerText = "Please enter username";
    return;
  }

  if (email === "") {
    message.innerText = "Please enter email";
    return;
  }

  // Email Validation
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    message.innerText = "Please enter a valid email address";
    return;
  }

  if (password === "") {
    message.innerText = "Please enter password";
    return;
  }
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match";
    return;
  }

  if (!document.getElementById("terms").checked) {
    message.innerText = "Please accept Terms & Conditions";
    return;
  }

  let response = await fetch("http://localhost:3001/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  let data = await response.json();

  if (data.status === "success") {
    message.innerText = "Signup Successful";

    localStorage.setItem("userName", username);

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1000);
  } else {
    message.innerText = data.message;
  }
  message.innerText = data.message;
}

async function login() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  let message = document.getElementById("loginMessage");

  if (email === "") {
    message.innerText = "Please enter email";
    return;
  }
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    message.innerText = "Please enter a valid email";
    return;
  }

  if (password === "") {
    message.innerText = "Please enter password";
    return;
  }

  let response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  let data = await response.json();

  if (data.token) {
    message.innerText = "Login Successful";

    localStorage.setItem("token", data.token);

    // Save username
    localStorage.setItem(
      "userName",
      data.username || localStorage.getItem("userName"),
    );

    setTimeout(() => {
      window.location.href = "dashboard/dashboard.html";
    }, 1000);
  } else {
    message.innerText = data.msg;
  }
}
