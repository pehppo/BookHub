/* ===================== */
/* ESTADO GLOBAL */
/* ===================== */

let currentBook = null;
let booksList = {};
let booksArray = [];

/* ===================== */
/* NAVEGAÇÃO */
/* ===================== */

function goToBook(id) {
    const path = window.location.pathname.includes('/pages/')
        ? './book.html'
        : 'pages/book.html';

    window.location.href = `${path}?id=${id}`;
}

function goBack() {
    window.history.back();
}

function buyBook() {
    if (currentBook?.link) {
        window.open(currentBook.link, '_blank');
    }
}

/* ===================== */
/* CARREGAMENTO DO JSON */
/* ===================== */

async function loadBooks() {
    const isInPages = window.location.pathname.includes('/pages/');
    const path = isInPages ? '../data/book.json' : './data/book.json';

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Erro ao carregar o arquivo JSON: ${response.status}`);
    }
    return await response.json();
}

/* ===================== */
/* DETALHES DO LIVRO */
/* ===================== */

function loadBook(id) {
    const book = booksList[id];

    if (!book) return;

    currentBook = book;

    const imagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

    document.getElementById('book-img').src = imagePrefix + book.image;
    document.getElementById('book-title').innerText = book.title;
    document.getElementById('book-author').innerText = book.author;
    document.getElementById('book-genre').innerText = book.genre;
    document.getElementById('book-rating').innerText = book.rating;
    document.getElementById('book-pages').innerText = book.pages;
    document.getElementById('book-year').innerText = book.year;
    document.getElementById('book-price').innerText = `${book.price}`;
    document.getElementById('book-description').innerText = book.description;
}

/* ===================== */
/* RENDERIZAÇÃO */
/* ===================== */

function createBookCard(book, imagePrefix = '') {
    return `
        <div class="book-card">
            <img src="${imagePrefix}${book.image}" 
                 alt="${book.title}"
                 onclick="goToBook(${book.id})">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `;
}

function renderBooks(type, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const filtered = booksArray.filter(book =>
        book.category.includes(type)
    );
    console.log(booksArray)
    console.log(filtered, type)
    const imagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

    container.innerHTML = filtered
        .map(book => createBookCard(book, imagePrefix))
        .join('');
}

function renderAllBooks() {
    const container = document.getElementById('allBooks');
    if (!container) return;

    const imagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

    const sorted = [...booksArray].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    container.innerHTML = sorted
        .map(book => createBookCard(book, imagePrefix))
        .join('');
}

/* ===================== */
/* BUSCA */
/* ===================== */

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const value = this.value.toLowerCase().trim();

        const searchSection = document.getElementById('searchSection');
        if (!searchSection) return;

        if (value === '') {
            searchSection.style.display = 'none';

            renderBooks('lancamentos', 'lancamentos');
            renderBooks('populares', 'populares');
            renderBooks('recomendados', 'recomendados');
            return;
        }

        searchSection.style.display = 'block';

        const results = booksArray.filter(book =>
            book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value)
        );

        renderSearchResults(results);
    });
}

function renderSearchResults(results) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = '<p>Nenhum livro encontrado.</p>';
        return;
    }

    const imagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

    container.innerHTML = results
        .map(book => createBookCard(book, imagePrefix))
        .join('');
}

/* ===================== */
/* FILTRO POR CATEGORIA */
/* ===================== */

function filterByCategory(genre, event) {
    console.log('Filtrando por categoria:', genre);
    console.log('Evento:', event);
    const button = event.currentTarget;
    console.log('Botão clicado:', genre, button);
    button.classList.toggle('active');
    button.innerHTML = button.classList.contains('active')
        ? `${genre} ✕`
        : genre;

    const activeButtons = document.querySelectorAll('.category-btn.active');
    const activeGenres = Array.from(activeButtons).map(btn =>
        btn.textContent.replace(' ✕', '')
    );

    const container = document.getElementById('categoryResults');
    const allBooksSection = document.getElementById('allBooks')?.parentElement;

    if (!container) return;

    if (activeGenres.length === 0) {
        container.innerHTML = '';
        if (allBooksSection) allBooksSection.style.display = 'block';
        return;
    }

    if (allBooksSection) allBooksSection.style.display = 'none';

    const filtered = booksArray.filter(book =>
        activeGenres.every(g => book.genre.includes(g))
    );
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h4>Ops!</h4>
                <p>Nenhum livro encontrado nestas categorias.</p>
            </div>
        `;
        return;
    }

    const imagePrefix = window.location.pathname.includes('/pages/') ? '../' : '';

    container.innerHTML = filtered
        .map(book => createBookCard(book, imagePrefix))
        .join('');
}

/* ===================== */
/* INICIALIZAÇÃO */
/* ===================== */

async function init() {
    try {
        booksList = await loadBooks();

        booksArray = Object.entries(booksList).map(([id, book]) => ({
            id: Number(id),
            ...book
        }));

        renderBooks('lancamentos', 'lancamentos');
        renderBooks('populares', 'populares');
        renderBooks('recomendados', 'recomendados');
        renderAllBooks();

        setupSearch();

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (id) {
            loadBook(id);
        }

    } catch (error) {
        console.error('Erro ao inicializar a aplicação:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);