async function loadBooks() {

    const jsonPath = window.location.pathname.includes('/pages/')
        ? '../assets/api/books.json'
        : './assets/api/books.json';

    const response = await fetch(jsonPath);

    const data = await response.json();

    return data;
}

const params = new URLSearchParams(window.location.search);
const bookId = parseInt(params.get("id"));
console.log("ID do livro na URL:", bookId);
/* ===================== */
/* DETALHES DO LIVRO */
/* ===================== */

async function loadBookDetails() {

    const data = await loadBooks();
    const books = data?.books;

    // Carrega o livro correto
    console.log("ID do livro na URL:", bookId);
    // Busca o livro pelo ID
    if (!bookId) {
        console.error("ID do livro não fornecido.");
        return;
    }
    const book = books[bookId];
    console.log("ID do livro:", bookId);
    console.log("Livro selecionado:", book);
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
loadBookDetails();