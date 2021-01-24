let myLibrary = [];

const addBookForm = document.querySelector('#add-book-form')

const newBookButton = document.querySelector('#new-book-button');
    newBookButton.addEventListener('click', () => {
        if(addBookForm.style.visibility === 'visible'){
            addBookForm.style.visibility = 'hidden'
        } else{
            addBookForm.style.visibility = 'visible';
        }
    });     //hides or shows the submit form

const hideButton = document.querySelector('#hide-button');
    hideButton.addEventListener('click', () => {
        addBookForm.style.visibility = 'hidden';
    });     //hides submit form

const submitButton = document.querySelector('#submit-button')
    submitButton.addEventListener('click', () =>{
        clearDisplay();
        addBookToLibrary();
        displayLibrary(myLibrary);
        addBookForm.style.visibility = 'hidden';
    })  //adds book to the array and updates display

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    const addBookTitle = document.querySelector('#add-book-title').value;
    const addBookAuthor = document.querySelector('#add-book-author').value;
    const addBookPages = document.querySelector('#add-book-pages').value;
    const isBookRead = document.querySelector('input[type=radio][name=read-status]:checked').value;
    const newBook = new Book(myLibrary.length, addBookTitle, addBookAuthor, addBookPages, isBookRead);
    myLibrary.push(newBook);
}


function displayLibrary(array) {
    const bookshelf = document.querySelector('#bookshelf');
    for (let i = 0; i < array.length; i++){
        const book = document.createElement('div');
        book.classList.add('book');
        book.id = array[i].id;
            const bp1 = document.createElement('p');
            bp1.classList.add('big-p');
            bp1.textContent = array[i].title;
            book.appendChild(bp1);

            const sp1 = document.createElement('p');
            sp1.classList.add('small-p');
            sp1.textContent = 'Title'
            book.appendChild(sp1);

            const bp2 = document.createElement('p');
            bp2.classList.add('big-p');
            bp2.textContent = array[i].author;
            book.appendChild(bp2);

            const sp2 = document.createElement('p');
            sp2.classList.add('small-p');
            sp2.textContent = 'Author'
            book.appendChild(sp2);

            const bp3 = document.createElement('p');
            bp3.classList.add('big-p');
            bp3.textContent = array[i].pages;
            book.appendChild(bp3);

            const sp3 = document.createElement('p');
            sp3.classList.add('small-p');
            sp3.textContent = 'Pages'
            book.appendChild(sp3);

            const bookReadButton = document.createElement('button');
            bookReadButton.classList.add('book-read-button');
                if(array[i].isRead == 'true'){
                    bookReadButton.classList.add('book-read');
                    bookReadButton.textContent = 'Read';
                } else {
                    bookReadButton.classList.add('book-not-read');
                    bookReadButton.textContent = 'Not read yet';
                }
                bookReadButton.addEventListener('click', () =>{
                    if(bookReadButton.textContent === 'Read'){
                        array[i].isRead = 'false';
                    } else {
                        array[i].isRead = 'true';
                    }
                    clearDisplay();
                    displayLibrary(myLibrary);
                }); //changes isRead value and updates display
            book.appendChild(bookReadButton);

            const deleteBook = document.createElement('button');
            deleteBook.innerHTML = '<icon class="material-icons">delete</icon>';
            deleteBook.classList.add('delete-book');
                deleteBook.addEventListener('click', () => {
                    myLibrary.splice(deleteBook.parentElement.id, 1);
                    deleteBook.parentElement.remove();
                    updateID(myLibrary);
                    clearDisplay();
                    displayLibrary(myLibrary);
                }); //removes book from array and updates display
            book.appendChild(deleteBook);
            bookshelf.appendChild(book);
    }
};

function clearDisplay() {
    const bookshelf = document.querySelector('#bookshelf');
        while (bookshelf.firstChild){
            bookshelf.removeChild(bookshelf.firstChild);
        }
}   

function updateID(array) {
    if(array.length != 0){
        for(let i = 0; i < array.length; i++){
            array[i].id = i;
        }
    }
}   //updates IDs of books when book is removed