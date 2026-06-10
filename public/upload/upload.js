function goBack() {
  window.location.href = "../dashboard/dashboard.html";
}

async function uploadResource() {
  const file = document.getElementById("fileUpload").files[0];
  const title = document.getElementById("resourceTitle").value.trim();
  const description = document.getElementById("description").value.trim();
  const tags = document.getElementById("tags").value.trim();
  const collection = document.getElementById("collection")?.value || "";

  const message = document.getElementById("uploadMessage");

  message.innerText = "";

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
    formData.append("collection", collection);

    const response = await fetch("http://localhost:3001/upload/resource", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      message.innerText = data.message || "Resource uploaded successfully!";

      // Clear form
      document.getElementById("fileUpload").value = "";
      document.getElementById("resourceTitle").value = "";
      document.getElementById("description").value = "";
      document.getElementById("tags").value = "";

      if (document.getElementById("collection")) {
        document.getElementById("collection").selectedIndex = 0;
      }
    } else {
      message.innerText = data.message || "Upload failed.";
    }
  } catch (error) {
    console.error(error);
    message.innerText = "Server error. Please try again.";
  }
}
