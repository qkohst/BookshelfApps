document.addEventListener("DOMContentLoaded", function () {

  const submitBookForm = document.getElementById("inputBookForm");

  submitBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});