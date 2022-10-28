{
  'use strict';

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

  const classNames = {
    hideBook: 'hidden',
    favBook: 'favorite',
  };

  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.renderRatingBars();
      thisBookList.renderBooksList();
      thisBookList.initAction();
    }

    getElements() {
      this.dom = {};

      this.dom.bookList = document.querySelector(select.books.list);
      this.dom.filtersForm = document.querySelector(select.containerOf.form);
    }

    renderRatingBars() {
      const books = dataSource.books;
  
      for (let book of books) {
        const bookRating = book.rating;
        const ratingWidth = bookRating * 10;
        book.ratingWidth = ratingWidth;
        let ratingBgc = '';
  
        if (bookRating < 6) {
          ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if (bookRating > 6 && bookRating <= 8) {
          ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (bookRating > 8 && bookRating <= 9) {
          ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if (bookRating > 9) {
          ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        book.ratingBgc = ratingBgc;
      }
    }

    renderBooksList() {
      const books = dataSource.books;
      for (let book of books) {
        const codeHTML = templates.bookPanel(book);
        const domElement = utils.createDOMFromHTML(codeHTML);
        this.dom.bookList.appendChild(domElement);
      }
    }

    addToFavorites(link) {
      event.preventDefault();
      const bookId = link.getAttribute('data-id');
      const bookIndex = favoritesBooks.indexOf(bookId);
  
      if (bookIndex < 0) {
        link.classList.add(classNames.favBook);
        favoritesBooks.push(bookId);
      } else if (bookIndex >= 0) {
        link.classList.remove(classNames.favBook);
        favoritesBooks.splice(bookIndex, 1);
      }
    }
  
    addFilters(input) {
      if (input.checked) {
        filters.push(input.value);
      } else {
        const filterIndex = filters.indexOf(input.value);
        filters.splice(filterIndex, 1);
      }
    }
  
    filterBooks() {
      const books = dataSource.books;
      let shouldBeHidden = false;
  
      for (let book of books) {
        
        for (let filter of filters) {
          if (book.details[filter] === false && book.id) {
            shouldBeHidden = true;
            break;
          } else if (book.details[filter] === true && book.id) {
            shouldBeHidden = false;
          }
        }
        const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (book.id && shouldBeHidden) {
          bookCover.classList.add(classNames.hideBook);
        } else if (!shouldBeHidden) {
          bookCover.classList.remove(classNames.hideBook);
        }
      }
    }
  
    initAction() {
      this.dom.bookList.addEventListener('dblclick', (event) => {
        event.preventDefault();
        const bookLink = event.target.parentNode.parentNode;
        if (bookLink.classList.contains('book__image')) {
          this.addToFavorites(bookLink);
        }
      });
  
      this.dom.filtersForm.addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.getAttribute('type') === 'checkbox' && event.target.getAttribute('name') === 'filter') {
          this.addFilters(event.target);
        }
      });
  
      this.dom.filtersForm.addEventListener('change', this.filterBooks);
    }
  }

  const app = new BookList();

  let favoritesBooks = [];
  let filters = [];

}