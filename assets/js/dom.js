const INCOMPLETE_BOOK_SHELF_LIST = "incompleteBookshelfList";
const COMPLETE_BOOK_SHELF_LIST = "completeBookshelfList";

const BOOK_ITEM_ID = "itemID";

// const COMPLETED_BOOK_READ_ID = "completeBookshelfList";
// const BOOK_ITEMID = "itemId"


function addBook() {

  const incompletedBOOKShelfList = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
  const completedBOOKShelfList = document.getElementById(COMPLETE_BOOK_SHELF_LIST);

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete");

  const book = makeBook(title, author, year, isComplete);

  if (isComplete.checked) {
    completedBOOKShelfList.append(book);
  } else {
    incompletedBOOKShelfList.append(book);
  }
}

// Menampilkan item dalam rak
function makeBook(title, author, year, isComplete) {

  const titleBook = document.createElement("h3");
  titleBook.innerText = title;

  const authorBook = document.createElement("p");
  authorBook.innerText = "Penulis : " + author;

  const yearBook = document.createElement("p");
  yearBook.innerText = "Tahun : " + year;

  const actionMenu = document.createElement('div');
  actionMenu.classList.add("action");

  // element Edit 
  const h3Title = document.createElement('h3');
  h3Title.innerText = "Edit Data Buku";

  const editTitle = document.createElement('div');
  editTitle.classList.add("edit-title");
  editTitle.append(h3Title);


  const labelEditBookTitle = document.createElement('label');
  labelEditBookTitle.innerText = "Judul";

  const editBookTitle = document.createElement('input');
  editBookTitle.type = "text";
  editBookTitle.value = title;

  const formGroupTitle = document.createElement('div');
  formGroupTitle.classList.add("form-group");
  formGroupTitle.append(labelEditBookTitle, editBookTitle);


  const labelEditBookAuthor = document.createElement('label');
  labelEditBookAuthor.innerText = "Judul";

  const editBookAuthor = document.createElement('input');
  editBookAuthor.type = "text";
  editBookAuthor.value = author;

  const formGroupAuthor = document.createElement('div');
  formGroupAuthor.classList.add("form-group");
  formGroupAuthor.append(labelEditBookAuthor, editBookAuthor);

  const labelEditBookYear = document.createElement('label');
  labelEditBookYear.innerText = "Judul";

  const editBookYear = document.createElement('input');
  editBookYear.type = "number";
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
    createButtonUndo(),
    createButtonSubmit()
  );

  const form = document.createElement('form');
  form.append(editTitle, editBody, editFooter);

  const formEdit = document.createElement('div');
  formEdit.classList.add("form-edit");
  formEdit.append(form);
  // End element Edit 

  const article = document.createElement("article");
  article.classList.add("book-item")
  article.append(titleBook, authorBook, yearBook, actionMenu, formEdit);

  if (isComplete.checked) {
    actionMenu.append(
      createIncompleteButton(),
      createEditButton(),
      createDeleteButton()
    );
  } else {
    actionMenu.append(
      createCompleteButton(),
      createEditButton(),
      createDeleteButton()
    );
  }

  return article;
}

// bUTTON
function createCompleteButton(eventListener) {
  const button = document.createElement("button");
  button.innerText = "Selesai Dibaca";
  button.classList.add("btn-blue");
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createIncompleteButton(eventListener) {
  const button = document.createElement("button");
  button.innerText = "Belum Selesai Dibaca";
  button.classList.add("btn-blue");
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createEditButton(eventListener) {
  const button = document.createElement("button");
  button.innerText = "Edit Data";
  button.classList.add("btn-yellow");
  button.addEventListener("click", function (event) {
    eventListener(event);
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

function createButtonUndo(eventListener) {
  const button = document.createElement("button");
  button.innerText = "Batal";
  button.type = "button";
  button.classList.add("btn-undo");
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createButtonSubmit(eventListener) {
  const button = document.createElement("button");
  button.innerText = "Simpan";
  button.type = "submit";
  button.classList.add("btn-submit");
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

//end bUTTON

// Hapus List Buku 
function deleteBook(taskElement) {
  taskElement.remove();
}



