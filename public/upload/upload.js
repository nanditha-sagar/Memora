document.addEventListener("DOMContentLoaded", () => {
  loadCollections();
});

function goBack() {
  window.location.href = "../dashboard/dashboard.html";
}

/* =========================
   LOAD COLLECTIONS
========================= */

async function loadCollections() {
  try {
    const response = await fetch("http://localhost:3001/collections");

    const collections = await response.json();

    const select = document.getElementById("collectionSelect");

    select.innerHTML = '<option value="">Select Collection</option>';

    collections.forEach((collection) => {
      select.innerHTML += `
        <option value="${collection.id}">
          ${collection.name}
        </option>
      `;
    });
  } catch (error) {
    console.error("Collections Error:", error);
  }
}

/* =========================
   UPLOAD RESOURCE
========================= */

async function uploadResource() {
  const file = document.getElementById("fileUpload").files[0];

  const title = document.getElementById("resourceTitle").value.trim();

  const description = document.getElementById("description").value.trim();

  const tags = document.getElementById("tags").value.trim();

  const collectionSelect = document.getElementById("collectionSelect");

  const collection_id = collectionSelect.value;

  const collection =
    collectionSelect.options[collectionSelect.selectedIndex]?.text || "";

  const message = document.getElementById("uploadMessage");

  message.innerText = "";

  /* Validation */

  if (!file) {
    message.innerText = "Please select a file.";
    return;
  }

  if (!title) {
    message.innerText = "Please enter a title.";
    return;
  }

  if (!description) {
    message.innerText = "Please enter a description.";
    return;
  }

  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    // Collection Name
    formData.append("collection", collection);

    // Collection ID
    formData.append("collection_id", collection_id);

    const response = await fetch("http://localhost:3001/upload/resource", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      message.innerText = data.message || "Resource uploaded successfully!";

      // Clear Form

      document.getElementById("fileUpload").value = "";

      document.getElementById("resourceTitle").value = "";

      document.getElementById("description").value = "";

      document.getElementById("tags").value = "";

      document.getElementById("collectionSelect").selectedIndex = 0;
    } else {
      message.innerText = data.message || "Upload failed.";
    }
  } catch (error) {
    console.error(error);

    message.innerText = "Server error. Please try again.";
  }
}
