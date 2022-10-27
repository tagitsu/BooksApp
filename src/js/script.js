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
    book: '.book'
  },
  templateOf: {
    book: '#template-book',
  },
};

const templates = {
  bookPanel: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

function initBooksList() {
  for (let book of this.data.books) {
    const codeHTML = templates.bookPanel(book);
    const domElement = utils.createDOMFromHTML(codeHTML);
    const bookList = document.querySelector(select.books.list);
    bookList.appendChild(domElement);
  }


}

initBooksList();