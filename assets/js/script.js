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

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});