document.addEventListener("DOMContentLoaded", function () {

  const submitBookForm = document.getElementById("inputBookForm");

  submitBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (checkLocalStorage()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});