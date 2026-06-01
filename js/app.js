async function loadBooks() {

    const jsonPath = window.location.pathname.includes('/pages/')
        ? '../assets/api/books.json'
        : './assets/api/books.json';

    const response = await fetch(jsonPath);

    const data = await response.json();

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
                            onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                            onclick="goToBook(${book.id})"
                            style="cursor:pointer;"
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

    // INDEX.HTML
    if (
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')
    ) {
        renderBooks("lancamentos", "lancamentos");
        renderBooks("populares", "populares");
        renderBooks("recomendados", "recomendados");
        initCarousel(booksArray);

    }

    // BOOK.HTML
    if (window.location.pathname.endsWith('/pages/book.html')) {
        const params = new URLSearchParams(window.location.search);
        const bookId = parseInt(params.get("id"));
        console.log("ID do livro:", bookId);
        loadBookDetails(bookId);
    }
    // CATEGORIAS
    if (window.location.pathname.endsWith('/pages/categories.html')) {
        renderAllBooks(booksArray);
        loadBooksCategory(booksArray);
        filterByCategory(booksArray);
    }
    /* ===================== */
    /* BUSCA */
    /* ===================== */

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const value = searchInput.value.toLowerCase();

            const searchSection = document.getElementById("searchResultsContainer");
            const searchResults = document.getElementById("searchResults");
            // Se vazio → volta ao normal
            if (value === "") {
                searchSection.style.display = "none";
                searchInput.style.borderRadius = "20px";

                renderBooks("lancamentos", "lancamentos");
                renderBooks("populares", "populares");
                renderBooks("recomendados", "recomendados");
                return;
            }

            searchInput.style.borderRadius = "20px 20px 0 0";
            // Mostra seção de busca
            searchSection.style.display = "block";

            const results = booksArray.filter(book =>
                book.title.toLowerCase().includes(value)
            );

            // fechar pesquisa ao clicar fora
            const searchBox = document.querySelector('.search-box');

            document.addEventListener('click', (event) => {

                if (!searchBox.contains(event.target)) {
                    searchSection.style.display = 'none';
                    searchInput.style.borderRadius = '20px';
                    searchInput.value = '';
                }

            });
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
            <div onclick="goToBook(${book.id})" class="book-card-result"  style="cursor:pointer;">
                <img
                    src="${imagePrefix}${book.image}"
                    onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                    style="cursor: pointer;"
                >
                <h3>${book.title}</h3>
            </div>
    `).join("");
    }
}
init();

