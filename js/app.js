
let loading = true;
// CARREGANDO LIVROS QUE ESTAO NO ARQUIVO JSON

async function loadBooks(url, retries = 5, delay = 2000) {
    try {
        const response = await fetch(url || './assets/api/books.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            console.warn(`Erro ao carregar os livros. Tentando novamente em ${delay / 1000} segundos... (${retries} tentativas restantes)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return loadBooks(url, retries - 1, delay);
        } else {
            console.error("Erro ao carregar os livros:", error);
        }
    }
    // const jsonPath = window.location.pathname.includes('/pages/')
    //     ? '../assets/api/books.json'
    //     : './assets/api/books.json';
}

// INICIANDO APLICAÇÃO
async function init() {
    let data;

    try {
        loading = true;
        console.log("Iniciando carregamento...");

        data = await loadBooks("https://bookhub-api-tbar.onrender.com/books");

        if (!data) {
            console.error("Nenhum dado retornado da API");
            return;
        }

        console.log("Livros carregados com sucesso:", data);

    } catch (error) {
        console.error("Erro no init:", error);
        return;

    } finally {
        loading = false;
        console.log("Finalizado");
    }

    const books = data;

    if (!Array.isArray(books)) {
        console.error("Formato inválido:", books);
        return;
    }




    /* ===================== */
    /* CONVERSÃO PARA ARRAY */
    /* ===================== */


    /* ===================== */
    /* INIT */
    /* ===================== */

    // INDEX.HTML
    if (
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')
    ) {
        renderBooks("lancamentos", "lancamentos", books);
        renderBooks("populares", "populares", books);
        renderBooks("recomendados", "recomendados", books);
        initCarousel(books);

    }

    // BOOK.HTML
    if (window.location.pathname.endsWith('/pages/book.html')) {
        const params = new URLSearchParams(window.location.search);
        const bookId = params.get("_id");
        loadBookDetails(bookId);

    }
    // CATEGORIAS
    if (window.location.pathname.endsWith('/pages/categories.html') && books.length > 0) {
        renderCategories(books);
        renderAllBooks(books);
        // loadBooksCategory(books);
        // filterByCategory(books);
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
                // renderBooks("lancamentos", "lancamentos", books);
                // renderBooks("populares", "populares", books);
                // renderBooks("recomendados", "recomendados", books);
                return;
            }

            searchInput.style.borderRadius = "20px 20px 0 0";
            // Mostra seção de busca
            searchSection.style.display = "block";

            const results = books.filter(book =>
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

        container.innerHTML = results.map(book => {
            return `
            <div onclick="goToBook('${book._id}')" class="book-card-result"  style="cursor:pointer;">
                <img
                    src="${imagePrefix}${book.image}"
                    onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                    style="cursor: pointer;"
                >
                <h3>${book.title}</h3>
            </div>
    `}).join("");

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
    window.location.href = `${path}?_id=${id.toString()}`;
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