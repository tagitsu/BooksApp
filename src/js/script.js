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
let filters = [];


function addToFavorites(link) {
  event.preventDefault();
  const bookId = link.getAttribute('data-id');
  const bookIndex = favoritesBooks.indexOf(bookId);

  if (bookIndex < 0) {
    link.classList.add('favorite');
    favoritesBooks.push(bookId);
  } else if (bookIndex >= 0) {
    link.classList.remove('favorite');
    favoritesBooks.splice(bookIndex, 1);
  }
}

// Ćwiczenie 5
// filtrowanie książek przy użyciu formularza
// Etap 1
// pusta tablica filters
// Następnie przygotuj referencję do formularza w .filters. 
// Dodaj też do initActions nowy nasłuchiwacz, który będzie obserwować właśnie nasz formularz i kiedy wykryje 
// jakiekolwiek kliknięcie, to uruchomi funkcję callback.
// W funkcji tej sprawdzaj, czy kliknięto na element, który faktycznie jest naszym checkboxem 
// (czy jego tagName to INPUT, type to checkbox, a name to filter), a jeśli tak, to pokaż w konsoli, jego wartość (value).


function addFilters(input) {
  if (input.checked) {
    filters.push(input.value);
  } else {
    const filterIndex = filters.indexOf(input.value);
    filters.splice(filterIndex, 1);
  }
}

// przejdzie po wszystkich książkach z dataSource.books i dla tych, które nie pasują do filtrów, doda klasę hidden. 
// Z kolei dla tych, które pasują do filtrów, upewni się, że tej klasy nie mają.
function filterBooks() {
  const books = dataSource.books;
  let shouldBeHidden = false;

  for (let book of books) {
    
    for (let filter of filters) {
      if (book.details[filter] === false && book.id) {
        shouldBeHidden = true;
      } else if (book.details[filter] === true && book.id) {
        shouldBeHidden = false;
      }
    }
    const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
    if (book.id && shouldBeHidden) {
      bookCover.classList.add('hidden');
    } else if (!shouldBeHidden) {
        bookCover.classList.remove('hidden');
    }
  }
}
  




// Ćwiczenie 4
// event delegation - technika ta polega na tym, że zamiast nasłuchiwać na pojedyncze elementy, 
// nasłuchuje się na jeden kontener.  


function initAction() {
  const bookList = document.querySelector(select.books.list);
  bookList.addEventListener('dblclick', function(event) {
    const bookLink = event.target.parentNode.parentNode;
    if (bookLink.classList.contains('book__image')) {
      addToFavorites(bookLink);
    }
  });

  const filtersForm = document.querySelector(select.containerOf.form);
  filtersForm.addEventListener('click', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.getAttribute('type') === 'checkbox' && event.target.getAttribute('name') === 'filter') {
      addFilters(event.target);
    }
  });

  filtersForm.addEventListener('change', filterBooks);
}

initAction();