let token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../login.html";
}
function logout() {
  localStorage.removeItem("token");

  alert("Logged out successfully");

  window.location.href = "../login.html";
}
const today = new Date();

document.getElementById("uploadDate").innerText = today.toLocaleString();

function openUploadPage() {
  window.location.href = "../upload/upload.html";
}
