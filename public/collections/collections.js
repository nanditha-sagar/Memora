function showForm() {
  document.getElementById("collectionForm").style.display = "block";
}

function hideForm() {
  document.getElementById("collectionForm").style.display = "none";
}

async function saveCollection() {
  const name = document.getElementById("collectionName").value.trim();

  const description = document
    .getElementById("collectionDescription")
    .value.trim();

  const image_url = document.getElementById("collectionImage").value.trim();

  if (!name) {
    alert("Collection name is required");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/collections/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        image_url,
      }),
    });

    const data = await response.json();

    alert(data.message);

    hideForm();

    document.getElementById("collectionName").value = "";
    document.getElementById("collectionDescription").value = "";
    document.getElementById("collectionImage").value = "";

    loadCollections();
  } catch (error) {
    console.error(error);
    alert("Failed to create collection");
  }
}

async function loadCollections() {
  try {
    const response = await fetch("http://localhost:3001/collections");

    const collections = await response.json();

    const grid = document.getElementById("collectionsGrid");

    grid.innerHTML = "";

    collections.forEach((collection) => {
      grid.innerHTML += `
        <div
          class="collection-card"
          onclick="
            window.location.href=
            'collection-details.html?id=${collection.id}'
          "
        >
          <h3>
            📁 ${collection.name}
          </h3>

          <p>
            ${collection.description || "No description"}
          </p>

          <small>
            Created:
            ${new Date(collection.created_at).toLocaleDateString()}
          </small>
        </div>
      `;
    });
  } catch (error) {
    console.error("Load Collections Error:", error);
  }
}

loadCollections();
