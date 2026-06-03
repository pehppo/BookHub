

/* ===================== */
/* RENDERIZAÇÃO DE LIVROS DO INDEX */
/* ===================== */

function renderBooks(type, elementId, books) {
    const container = document.getElementById(elementId);
    if (!container && !books.length) return;
    const filtered = books.filter(book => {

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
                            onclick="goToBook('${book._id}')"
                            style="cursor:pointer;"
                        >
                        <h3>${book.title}</h3>

                        <p class="genre">${book.genre}</p>

                        <button onclick="goToBook('${book._id}')">
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

// RENDERIZAR TODOS OS LIVROS
async function renderAllBooks(books) {

    const container = document.getElementById("allBooks");
    if (!container) return;
    const isInPages = window.location.pathname.includes('/pages/');
    const imagePrefix = isInPages ? '../' : '';
    const sorted = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
    container.innerHTML = sorted.map(book => `
        <div class="book-card">
           <img
                src="${imagePrefix}${book.image}"
                onerror="this.src='${imagePrefix}assets/imgs/image-default.png'"
                onclick="goToBook('${book._id}')"
                style="cursor:pointer;"
            >
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook('${book._id}')">Ver livro</button>
        </div>
    `).join("");
}

/* ===================== */
/* CATEGORIAS FILTRADAS*/
/* ===================== */

async function filterByCategory(event, genre) {
    const books = await loadBooks();
    const button = event.target;
    if (!button.classList.contains('category-btn') && books.length > 0) {
        return;
    }
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
    const filtered = books.filter(book => {
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
                onclick="goToBook('${book._id}')"
                style="cursor:pointer;"
            >
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook('${book._id}')">Ver livro</button>
        </div>
    `).join("");
}
window.renderAllBooks = renderAllBooks;
window.filterByCategory = filterByCategory;
window.renderBooks = renderBooks;