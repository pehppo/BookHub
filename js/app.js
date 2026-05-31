async function loadBooks() {

    const response = await fetch('./assets/api/books.json');

    const data = await response.json();

    console.log(data.books);
    return data;

}

async function init() {

    const data = await loadBooks();

    const books = data?.books;
    if (!books) {
        console.error("Nenhum livro encontrado.");
        return;
    }

    /* ===================== */
    /* NAVEGAÇÃO */
    /* ===================== */

    // Vai para página de detalhes com o ID na URL
    function goToBook(id) {
        const path = window.location.pathname.includes('/pages/') ? './book.html' : 'pages/book.html';
        window.location.href = `${path}?id=${id}`;
    }

    // Guarda o livro atual (usado no botão comprar)
    let currentBook = null;
    window.goToBook = goToBook;

    /* ===================== */
    /* DETALHES DO LIVRO */
    /* ===================== */

    function loadBook(id) {

        // Busca o livro pelo ID
        const book = books[id];

        if (!book) return;

        currentBook = book;

        // Preenche os dados na tela
        document.getElementById("book-img").src = "../" + book.image;
        document.getElementById("book-title").innerText = book.title;
        document.getElementById("book-author").innerText = book.author;
        document.getElementById("book-genre").innerText = book.genre;
        document.getElementById("book-rating").innerText = book.rating;
        document.getElementById("book-pages").innerText = book.pages;
        document.getElementById("book-year").innerText = book.year;
        document.getElementById("book-price").innerText = book.price;
        document.getElementById("book-description").innerText = book.description;
    }

    // Voltar
    function goBack() {
        window.history.back();
    }

    // Comprar
    function buyBook() {
        if (currentBook && currentBook.link) {
            window.open(currentBook.link, "_blank");
        }
    }

    /* ===================== */
    /* BANCO DE DADOS */
    /* ===================== */



    /* ===================== */
    /* CONVERSÃO PARA ARRAY */
    /* ===================== */

    const booksArray = Object.entries(books).map(([id, book]) => ({
        id: Number(id),
        ...book
    }));

    /* ===================== */
    /* RENDERIZAÇÃO */
    /* ===================== */

    function renderBooks(type, elementId) {

        const container = document.getElementById(elementId);
        if (!container) return;

        const filtered = booksArray.filter(book => {

            if (type === "lancamentos") return book.category.includes("lancamentos");
            if (type === "populares") return book.category.includes("populares");
            if (type === "recomendados") return book.category.includes("recomendados");

            return false;
        });

        const isInPages = window.location.pathname.includes('/pages/');
        const imagePrefix = isInPages ? '../' : '';

        container.innerHTML = `
    <div class="carousel">
        <div class="container">
            <div class="slides">
                ${filtered.map(book => `
                    <div class="book-card">
                        <img 
                            src="${imagePrefix}${book.image}" 
                            onclick="goToBook(${book.id})" 
                            style="cursor: pointer;"
                        >

                        <h3>${book.title}</h3>

                        <p class="genre">${book.genre}</p>

                        <button onclick="goToBook(${book.id})">
                            Ver livro
                        </button>
                    </div>
                `).join("")}
            </div>
        </div>
        <button type="button" class="carousel-button prev">
            &#10094;
        </button>

        <button type="button" class="carousel-button next">
            &#10095;
        </button>
    </div>
`;
    }

    /* ===================== */
    /* INIT */
    /* ===================== */

    renderBooks("lancamentos", "lancamentos");
    renderBooks("populares", "populares");
    renderBooks("recomendados", "recomendados");

    /* ===================== */
    /* BUSCA */
    /* ===================== */

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const value = searchInput.value.toLowerCase();

            const searchSection = document.getElementById("searchSection");
            const searchResults = document.getElementById("searchResults");

            // Se vazio → volta ao normal
            if (value === "") {
                searchSection.style.display = "none";

                renderBooks("lancamentos", "lancamentos");
                renderBooks("populares", "populares");
                renderBooks("recomendados", "recomendados");
                return;
            }

            // Mostra seção de busca
            searchSection.style.display = "block";

            const results = booksArray.filter(book =>
                book.title.toLowerCase().includes(value)
            );

            renderSearchResults(results);
        });
    }

    /* ===================== */
    /* RESULTADOS */
    /* ===================== */

    function renderSearchResults(results) {

        const container = document.getElementById("searchResults");

        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = "<p>Nenhum livro encontrado.</p>";
            return;
        }

        const isInPages = window.location.pathname.includes('/pages/');
        const imagePrefix = isInPages ? '../' : '';

        container.innerHTML = results.map(book => `
        <div class="book-card">
            <img src="${imagePrefix}${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
    }

    /* ===================== */
    /* RENDERIZAR TODOS OS LIVROS */
    /* ===================== */

    function renderAllBooks() {
        const container = document.getElementById("allBooks");
        if (!container) return;

        const isInPages = window.location.pathname.includes('/pages/');
        const imagePrefix = isInPages ? '../' : '';

        const sorted = [...booksArray].sort((a, b) => a.title.localeCompare(b.title));

        container.innerHTML = sorted.map(book => `
        <div class="book-card">
            <img src="${imagePrefix}${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
    }

    /* ===================== */
    /* CATEGORIAS */
    /* ===================== */

    function filterByCategory(genre) {

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

        const filtered = booksArray.filter(book =>
            activeGenres.every(g => book.genre.includes(g))
        );

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
            <img src="${imagePrefix}${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
    }
    window.filterByCategory = filterByCategory;
}

init();

