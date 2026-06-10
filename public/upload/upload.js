function goBack() {
  window.location.href = "../dashboard/dashboard.html";
}
async function uploadResource() {
  let file = document.getElementById("fileUpload").files[0];

  let title = document.getElementById("resourceTitle").value.trim();

  let description = document.getElementById("description").value.trim();

  let message = document.getElementById("uploadMessage");

  if (!file) {
    message.innerText = "Please select a file";
    return;
  }

  if (title === "") {
    message.innerText = "Please enter title";
    return;
  }

  if (description === "") {
    message.innerText = "Please enter description";
    return;
  }

  let formData = new FormData();

  formData.append("file", file);
  formData.append("title", title);
  formData.append("description", description);

  let response = await fetch("http://localhost:3001/upload/resource", {
    method: "POST",
    body: formData,
  });

  let data = await response.json();

  message.innerText = data.message;
}
