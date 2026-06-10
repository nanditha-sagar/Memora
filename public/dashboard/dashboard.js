document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");

  if (userName) {
    document.getElementById("welcomeMessage").innerText =
      `Welcome back, ${userName}`;
  }
});
let token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../login.html";
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  alert("Logged out successfully");

  window.location.href = "../login.html";
}
const today = new Date();

document.getElementById("uploadDate").innerText = today.toLocaleString();

function openUploadPage() {
  window.location.href = "../upload/upload.html";
}
