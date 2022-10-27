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
function addToFavorites() {
  const favoritesBooks = [];
  favoritesBooks.push(this);
  console.log('ulubione', favoritesBooks);
  this.classList.add('favorite');
}
function initAction() {
  const bookLink = document.querySelectorAll(select.books.bookLink);
  console.log('linki do książek', bookLink);
  for (let link of bookLink) {
    link.addEventListener('dblclick', addToFavorites);
  }
}


initAction();