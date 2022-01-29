
let inputBookIsComplete = document.getElementById("inputBookIsComplete");
let rack = document.getElementById("rack");

function updateRack() {
  if (inputBookIsComplete.checked) {
    rack.innerHTML = "Selesai dibaca";
  } else {
    rack.innerHTML = "Belum selesai dibaca";
  }
}


function showHideForm(id) {
  let formEdit = document.getElementById("formEdit" + id);
  if (formEdit.style.display == "block") {
    formEdit.style.display = "none";
  } else {
    formEdit.style.display = "block";
  }
}

function hideForm(id) {
  document.getElementById("formEdit" + id).style.display = "none";
}


// LANJUT Show Hidden By Id EDIT FORM
