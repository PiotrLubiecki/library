let myLibrary = [];

const addBookForm = document.querySelector("#add-book-form");
//hides or shows the submit form
const newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", () => {
  if (addBookForm.style.visibility === "visible") {
    addBookForm.style.visibility = "hidden";
  } else {
    addBookForm.style.visibility = "visible";
  }
});
//hides submit form
const hideButton = document.querySelector("#hide-button");
hideButton.addEventListener("click", () => {
  addBookForm.style.visibility = "hidden";
});
//adds book to the array and updates display
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", () => {
  let x = validity();
  if (x === true){
    clearDisplay();
    addBookToLibrary();
    displayLibrary(myLibrary);
    addBookForm.style.visibility = "hidden";
  }
});

//class to make new book objects
class Book {
  constructor(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const validity = function () {
    let inpObj0 = document.querySelector("#add-book-title");;
    let inpObj1 = document.querySelector("#add-book-author");
    let inpObj2 = document.querySelector("#add-book-pages");
    if ((!inpObj0.checkValidity()) || (!inpObj1.checkValidity()) || (!inpObj2.checkValidity())) {
      alert("Please fill out all the fields")
      return false
    }
    return true;
}

function addBookToLibrary() {
  let addBookTitle = document.querySelector("#add-book-title").value;
  let addBookAuthor = document.querySelector("#add-book-author").value;
  let addBookPages = document.querySelector("#add-book-pages").value;
  const isBookRead = document.querySelector(
    "input[type=radio][name=read-status]:checked"
  ).value;
  const newBook = new Book(
    myLibrary.length,
    addBookTitle,
    addBookAuthor,
    addBookPages,
    isBookRead
  );
  myLibrary.push(newBook);
  saveLocalStorage();
}

function displayLibrary(array) {
  const bookshelf = document.querySelector("#bookshelf");
  for (let i = 0; i < array.length; i++) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.id = array[i].id;
    const bp1 = document.createElement("p");
    const sp1 = document.createElement("p");
    const bp2 = document.createElement("p");
    const sp2 = document.createElement("p");
    const bp3 = document.createElement("p");
    const sp3 = document.createElement("p");
    const bookReadButton = document.createElement("button");
    const deleteBook = document.createElement("button");

    bp1.classList.add("big-p");
    sp1.classList.add("small-p");
    bp2.classList.add("big-p");
    sp2.classList.add("small-p");
    bp3.classList.add("big-p");
    sp3.classList.add("small-p");
    //sets button text and color according to read status
    if (array[i].isRead == "true") {
      bookReadButton.classList.add("book-read");
      bookReadButton.textContent = "Read";
    } else {
      bookReadButton.classList.add("book-not-read");
      bookReadButton.textContent = "Not read yet";
    }
    deleteBook.classList.add("delete-book");

    bp1.textContent = array[i].title;
    sp1.textContent = "Title";
    bp2.textContent = array[i].author;
    sp2.textContent = "Author";
    bp3.textContent = array[i].pages;
    sp3.textContent = "Pages";
    deleteBook.innerHTML = '<icon class="material-icons">delete</icon>';
    //changes isRead value and updates display
    bookReadButton.addEventListener("click", () => {
      if (bookReadButton.textContent === "Read") {
        array[i].isRead = "false";
      } else {
        array[i].isRead = "true";
      }
      clearDisplay();
      saveLocalStorage();
      displayLibrary(myLibrary);
    });
    //removes book from array and updates display
    deleteBook.addEventListener("click", () => {
      myLibrary.splice(deleteBook.parentElement.id, 1);
      deleteBook.parentElement.remove();
      updateID(myLibrary);
      clearDisplay();
      saveLocalStorage();
      displayLibrary(myLibrary);
    });

    book.appendChild(bp1);
    book.appendChild(sp1);
    book.appendChild(bp2);
    book.appendChild(sp2);
    book.appendChild(bp3);
    book.appendChild(sp3);
    book.appendChild(bookReadButton);
    book.appendChild(deleteBook);

    bookshelf.appendChild(book);
  }
}

function clearDisplay() {
  const bookshelf = document.querySelector("#bookshelf");
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  }
}
//updates IDs of books when book is removed
function updateID(array) {
  if (array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      array[i].id = i;
    }
  }
}

function saveLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
} //JSON.stringify -> local storage only supports strings

function loadLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary === null) {
    myLibrary = [];
  }
  displayLibrary(myLibrary);
}

loadLocalStorage();
