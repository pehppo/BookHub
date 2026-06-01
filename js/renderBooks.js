async function loadBooks() {
    const jsonPath = window.location.pathname.includes('/pages/')
        ? '../assets/api/books.json'
        : './assets/api/books.json';

    const response = await fetch(jsonPath);

    const data = await response.json();

    return data.books;
}
/* ===================== */
/* RENDERIZAR TODOS OS LIVROS */
/* ===================== */
async function renderAllBooks() {
    const books = await loadBooks();
    const booksArray = Object.entries(books).map(([id, book]) => ({
        id: Number(id),
        ...book
    }));

    const container = document.getElementById("allBooks");
    if (!container) return;
    const isInPages = window.location.pathname.includes('/pages/');
    const imagePrefix = isInPages ? '../' : '';
    const sorted = [...booksArray].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
    container.innerHTML = sorted.map(book => `
        <div class="book-card">
           <img
                src="${imagePrefix}${book.image}"
                onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                onclick="goToBook(${book.id})"
                style="cursor:pointer;"
            >
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
}

/* ===================== */
/* CATEGORIAS */
/* ===================== */

async function filterByCategory(event, genre) {
    const { books } = await loadBooks();
    const booksArray = Object.values(books);
    const button = event.target;
    // Toggle active class
    button.classList.toggle('active');

    if (button.classList.contains('active')) {
        button.innerHTML = genre + ' ✕';
    } else {
        button.innerHTML = genre;
    }

    // Get all active genres
    const activeButtons = document.querySelectorAll('.category-btn.active');
    const activeGenres = Array.from(activeButtons).map(btn => btn.innerHTML.replace(' ✕', ''));

    const container = document.getElementById("categoryResults");
    const allBooksSection = document.getElementById("allBooks")?.parentElement;

    if (!container) return;

    if (activeGenres.length === 0) {
        container.innerHTML = "";
        if (allBooksSection) allBooksSection.style.display = "block";
        return;
    }


    if (allBooksSection) allBooksSection.style.display = "none";
    const filtered = booksArray.filter(book => {
        return activeGenres.every(g => book.genre.includes(g))
    });

    const isInPages = window.location.pathname.includes('/pages/');
    const imagePrefix = isInPages ? '../' : '';

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h4>Ops!</h4>
                <p>Nenhum livro encontrado nestas categorias.</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(book => `
        <div class="book-card">
           <img
                src="${imagePrefix}${book.image}"
                onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                onclick="goToBook(${book.id})"
                style="cursor:pointer;"
            >
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
}
window.filterByCategory = filterByCategory;
renderAllBooks();
