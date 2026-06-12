document.addEventListener("DOMContentLoaded", () => {
  // Check Login
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../login.html";
    return;
  }

  // Welcome Message
  const userName = localStorage.getItem("userName");

  if (userName) {
    document.getElementById("welcomeMessage").innerText =
      `Welcome back, ${userName}`;
  }

  // Current Date
  const uploadDate = document.getElementById("uploadDate");

  if (uploadDate) {
    uploadDate.innerText = new Date().toLocaleString();
  }

  // Load Uploads
  loadRecentUploads();
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");

  alert("Logged out successfully");

  window.location.href = "../login.html";
}

function openUploadPage() {
  window.location.href = "../upload/upload.html";
}

async function loadRecentUploads() {
  try {
    const response = await fetch("http://localhost:3001/upload/recent");

    const uploads = await response.json();

    const container = document.getElementById("recentUploads");

    if (!container) return;

    container.innerHTML = "";

    uploads.forEach((upload) => {
      const fileUrl =
        "http://localhost:3001/" + upload.file_path.replace(/\\/g, "/");

      container.innerHTML += `
    <div class="upload-card">
      <h3>📄 ${upload.title}</h3>
      <p>${upload.description}</p>
      <small>${upload.file_name}</small>

      <button
        class="view-btn"
        onclick="window.open('${fileUrl}', '_blank')"
      >
        Open File
      </button>
    </div>
  `;
    });
  } catch (error) {
    console.error("Error loading uploads:", error);
  }
}
function openCollection(name) {
  localStorage.setItem("selectedCollection", name);

  window.location.href = "../collections/collections.html";
}
