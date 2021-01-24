let myLibrary = [];

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {

}

const addBookForm = document.querySelector('#add-book-form')

const newBookButton = document.querySelector('#new-book-button');
    newBookButton.addEventListener('click', () => {
        if(addBookForm.style.visibility === 'visible'){
            addBookForm.style.visibility = 'hidden'
        } else{
            addBookForm.style.visibility = 'visible';
        }
    });

const hideButton = document.querySelector('#hide-button');
    hideButton.addEventListener('click', () => {
        addBookForm.style.visibility = 'hidden';
    });