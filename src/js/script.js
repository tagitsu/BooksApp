// Ćwiczenie 1
// Twoim zadaniem jest utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z dataSource.books 
// i wyrenderuje dla nich reprezentacje HTML w liście .books-list. 
// Oczywiście musisz wykorzystać w tym celu dostarczony już szablon (#template-book).

this.data = dataSource;

const select = {
  containerOf: {
    app: '.container',
    form: '.filters',
    books: '.books-panel',
  }, 
  books: {
    list: '.books-list',
    book: '.book',
    bookLink: 'a.book__image',
  },
  templateOf: {
    book: '#template-book',
  },
};

const templates = {
  bookPanel: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

function renderBooksList() {
  for (let book of this.data.books) {
    const codeHTML = templates.bookPanel(book);
    const domElement = utils.createDOMFromHTML(codeHTML);
    const bookList = document.querySelector(select.books.list);
    bookList.appendChild(domElement);
  }
}

renderBooksList();

// Ćwiczenie 2
// musisz dodać do JS-a pustą tablicę favoriteBooks oraz odpowiedni kod, który zadba 
// o to, aby przy dwukliku na okładkę dowolnej książki, jej id było dodawane do tej tablicy, 
// a do samego elementu HTML została dodana klasa favorite. Tyle.

// Ćwiczenie 3
// Musisz tak zmodyfikować swoją funkcję przypiętą do nasłuchiwacza, aby najpierw sprawdzała, czy książka nie jest już 
// w "ulubionych". Jeśli nie jest, to funkcja ma działać tak, jak dotychczas, a więc dodać klasę favorite i zapisać id 
// książki w tablicy favoriteBooks. Jeśli jednak jest, to skrypt powinien usuwać id takiej książki z tablicy favoriteBooks 
// oraz zabierać takiemu elementowi klasę favorite.


let favoritesBooks = [];
function addToFavorites() {
  event.preventDefault();
  const bookId = this.getAttribute('data-id');
  console.log('id książki', bookId);
  const bookIndex = favoritesBooks.indexOf(bookId);
  console.log('index książki', bookIndex);
  console.log('favs', favoritesBooks);  

  if (bookIndex < 0) {
    this.classList.add('favorite');
    favoritesBooks.push(bookId);
  } else if (bookIndex >= 0) {
    this.classList.remove('favorite');
    favoritesBooks.splice(bookIndex, 1);
  }
}
  
  

function initAction() {
  const bookLink = document.querySelectorAll(select.books.bookLink);
  for (let link of bookLink) {
    link.addEventListener('dblclick', addToFavorites);
  }
}

initAction();