

// CARREGANDO LIVROS QUE ESTAO NO ARQUIVO JSON

async function loadBooks() {

    const jsonPath = window.location.pathname.includes('/pages/')
        ? '../assets/api/books.json'
        : './assets/api/books.json';

    const response = await fetch(jsonPath);

    const data = await response.json();

    return data;
}

// INICIANDO APLICAÇÃO
async function init() {
    const data = await loadBooks();
    const books = data?.books;


    if (!books) {
        console.error("Nenhum livro encontrado.");
        return;
    }





    /* ===================== */
    /* CONVERSÃO PARA ARRAY */
    /* ===================== */

    const booksArray = Object.entries(books).map(([id, book]) => ({
        id: Number(id),
        ...book
    }));

    /* ===================== */
    /* INIT */
    /* ===================== */

    // INDEX.HTML
    if (
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')
    ) {
        renderBooks("lancamentos", "lancamentos", booksArray);
        renderBooks("populares", "populares", booksArray);
        renderBooks("recomendados", "recomendados", booksArray);
        initCarousel(booksArray);

    }

    // BOOK.HTML
    if (window.location.pathname.endsWith('/pages/book.html')) {
        const params = new URLSearchParams(window.location.search);
        const bookId = parseInt(params.get("id"));
        loadBookDetails(bookId);

    }
    // CATEGORIAS
    if (window.location.pathname.endsWith('/pages/categories.html') && booksArray.length > 0) {
        renderAllBooks(booksArray);
        // loadBooksCategory(booksArray);
        // filterByCategory(booksArray);
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
                // renderBooks("lancamentos", "lancamentos", booksArray);
                // renderBooks("populares", "populares", booksArray);
                // renderBooks("recomendados", "recomendados", booksArray);
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


    return true
}


// Guarda o livro atual (usado no botão comprar)
let currentBook = null;
/* ===================== */
/* NAVEGAÇÃO */
/* ===================== */
// Vai para página de detalhes com o ID na URL
function goToBook(id) {
    const path = window.location.pathname.includes('/pages/') ? './book.html' : 'pages/book.html';
    window.location.href = `${path}?id=${id}`;

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



// ESPERA O JS CARREGAR PARA INICIAR O INIT
document.addEventListener('DOMContentLoaded', async () => {

    await init();
});