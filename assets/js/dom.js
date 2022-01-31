const INCOMPLETE_BOOK_SHELF_LIST = "incompleteBookshelfList";
const COMPLETE_BOOK_SHELF_LIST = "completeBookshelfList";
const BOOK_ITEM_ID = "itemID";

function addBook() {
  const incompletedBOOKShelfList = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
  const completedBOOKShelfList = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
  const formInput = document.getElementById("inputBookForm");

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");

  let isComplete;
  if (inputBookIsComplete.checked) {
    isComplete = true;
  } else {
    isComplete = false;
  }

  const bookObject = composeBookObject(title, author, year, isComplete);
  const book = makeBook(bookObject.id, bookObject.title, bookObject.author, bookObject.year, bookObject.isComplete);

  if (bookObject.isComplete == true) {
    completedBOOKShelfList.append(book);
  } else {
    incompletedBOOKShelfList.append(book);
  }

  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);
  updateDataToStorage();
  
  formInput.reset();
}


function makeBook(id, title, author, year, isComplete) {
  const article = document.createElement("article");

  const titleBook = document.createElement("h3");
  titleBook.innerText = title;

  const authorBook = document.createElement("p");
  authorBook.innerText = "Penulis : " + author;

  const yearBook = document.createElement("p");
  yearBook.innerText = "Tahun : " + year;

  const actionMenu = document.createElement('div');
  actionMenu.classList.add("action");

  const h3Title = document.createElement('h3');
  h3Title.innerText = "Edit Data Buku";

  const editTitle = document.createElement('div');
  editTitle.classList.add("edit-title");
  editTitle.append(h3Title);

  const labelEditBookTitle = document.createElement('label');
  labelEditBookTitle.innerText = "Judul";

  const editBookTitle = document.createElement('input');
  editBookTitle.type = "text";
  editBookTitle.setAttribute("id", "editBookTitle" + id);
  editBookTitle.value = title;

  const formGroupTitle = document.createElement('div');
  formGroupTitle.classList.add("form-group");
  formGroupTitle.append(labelEditBookTitle, editBookTitle);

  const labelEditBookAuthor = document.createElement('label');
  labelEditBookAuthor.innerText = "Judul";

  const editBookAuthor = document.createElement('input');
  editBookAuthor.type = "text";
  editBookAuthor.setAttribute("id", "editBookAuthor" + id);
  editBookAuthor.value = author;

  const formGroupAuthor = document.createElement('div');
  formGroupAuthor.classList.add("form-group");
  formGroupAuthor.append(labelEditBookAuthor, editBookAuthor);

  const labelEditBookYear = document.createElement('label');
  labelEditBookYear.innerText = "Judul";

  const editBookYear = document.createElement('input');
  editBookYear.type = "number";
  editBookYear.setAttribute("id", "editBookYear" + id);
  editBookYear.value = year;

  const formGroupYear = document.createElement('div');
  formGroupYear.classList.add("form-group");
  formGroupYear.append(labelEditBookYear, editBookYear);

  const editBody = document.createElement('div');
  editBody.classList.add("edit-body");
  editBody.append(formGroupTitle, formGroupAuthor, formGroupYear);

  const editFooter = document.createElement('div');
  editFooter.classList.add("edit-footer");
  editFooter.append(
    createButtonUndo(id),
    createButtonSubmit(article, id)
  );

  const form = document.createElement('form');
  form.append(editTitle, editBody, editFooter);

  const formEdit = document.createElement('div');
  formEdit.classList.add("form-edit");
  formEdit.setAttribute("id", "formEdit" + id);
  formEdit.append(form);

  article.classList.add("book-item")
  article.append(titleBook, authorBook, yearBook, actionMenu, formEdit);

  if (isComplete == true) {
    actionMenu.append(
      createIncompleteButton(),
      createEditButton(id),
      createDeleteButton()
    );
  } else {
    actionMenu.append(
      createCompleteButton(),
      createEditButton(id),
      createDeleteButton()
    );
  }

  return article;
}


function createCompleteButton() {
  const button = document.createElement("button");
  button.innerText = "Selesai Dibaca";
  button.classList.add("btn-blue");
  button.addEventListener("click", function (event) {
    moveBookToCompleted(event.target.parentElement.parentElement);
  });
  return button;
}


function createIncompleteButton() {
  const button = document.createElement("button");
  button.innerText = "Belum Selesai Dibaca";
  button.classList.add("btn-blue");
  button.addEventListener("click", function (event) {
    moveBookToIncompleted(event.target.parentElement.parentElement);
  });
  return button;
}


function createEditButton(id) {
  const button = document.createElement("button");
  button.innerText = "Edit Data";
  button.classList.add("btn-yellow");
  button.setAttribute("id", "btnEdit" + id);
  button.addEventListener("click", function () {
    showHideForm(id);
  });
  return button;
}


function createDeleteButton() {
  const button = document.createElement("button");
  button.innerText = "Hapus";
  button.classList.add("btn-red");
  button.addEventListener("click", function (event) {
    deleteBook(event.target.parentElement.parentElement);
  });
  return button;
}


function createButtonUndo(id) {
  const button = document.createElement("button");
  button.innerText = "Batal";
  button.type = "button";
  button.classList.add("btn-undo");
  button.setAttribute("id", "btnUndo" + id);
  button.addEventListener("click", function () {
    hideForm(id);
  });
  return button;
}


function createButtonSubmit(bookElement, id) {
  const button = document.createElement("button");
  button.innerText = "Simpan";
  button.type = "button";
  button.classList.add("btn-submit");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    updateBook(bookElement, id);
  });
  return button;
}


function deleteBook(bookElement) {
  const book = findBook(bookElement[BOOK_ITEM_ID]);
  if (confirm("Hapus buku " + book.title + " ?")) {
    const bookPosition = findbookIndex(bookElement[BOOK_ITEM_ID]);
    books.splice(bookPosition, 1);
    bookElement.remove();
    updateDataToStorage();
    alert("Data buku " + book.title + " berhasil dihapus !");
  }
}


function moveBookToCompleted(bookElement) {
  const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
  const Book = findBook(bookElement[BOOK_ITEM_ID]);
  if (confirm("Tandai ke rak selesai dibaca ?")) {
    const newBook = makeBook(Book.id, Book.title, Book.author, Book.year, true);
    Book.isComplete = true;
    newBook[BOOK_ITEM_ID] = book.id;
    completeBookshelfList.append(newBook);
    bookElement.remove();
    updateDataToStorage();
  }
}

function moveBookToIncompleted(bookElement) {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
  const Book = findBook(bookElement[BOOK_ITEM_ID]);
  if (confirm("Tandai ke rak belum selesai dibaca ?")) {
    const newBook = makeBook(Book.id, Book.title, Book.author, Book.year, false);
    Book.isComplete = false;
    newBook[BOOK_ITEM_ID] = book.id;
    incompleteBookshelfList.append(newBook);
    bookElement.remove();
    updateDataToStorage();
  }
}

function updateBook(bookElement, id) {
  let bookEdit;
  let title = document.getElementById("editBookTitle" + id).value;
  let author = document.getElementById("editBookAuthor" + id).value;
  let year = document.getElementById("editBookYear" + id).value;

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  if (confirm("Simpan data buku ?")) {
    const newBook = makeBook(book.id, title, author, year, book.isComplete);
    if (book.isComplete) {
      bookEdit = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
    } else {
      bookEdit = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
    }
    newBook[BOOK_ITEM_ID] = book.id;
    bookEdit.append(newBook);
    bookElement.remove();
    updateDataToStorage();
    alert("Data buku " + book.title + " berhasil disimpan !");
  }
}


const searchBookTitle = document.querySelector("#searchBookTitle");
searchBookTitle.addEventListener("keyup", searchBook);

function searchBook(e) {
  const text = e.target.value.toLowerCase();
  const resetSearch = document.getElementById("resetSearch");
  if (text !== "") {
    resetSearch.style.display = "block";
  } else {
    resetSearch.style.display = "none";
  }

  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach((book) => {
    const itemText = book.textContent.toLowerCase();
    if (itemText.indexOf(text) !== -1) {
      book.setAttribute("style", "display: block");
    } else {
      book.setAttribute("style", "display: none");
    }
  });
}