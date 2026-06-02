
/* ===================== */
/* DETALHES DO LIVRO */
/* ===================== */

async function loadBookDetails(bookId) {

    const data = await loadBooks();
    const books = data?.books;
    // Carrega o livro correto
    // Busca o livro pelo ID
    if (!bookId) {
        console.error("ID do livro não fornecido.");
        return;
    }
    const book = books[bookId];
    if (!book) return;

    currentBook = book;
    const isInPages = window.location.pathname.includes('/pages/');
    const imagePrefix = isInPages ? '../' : '';
    // Preenche os dados na tela
    // Caso a imagem nao carregue, exibe a imagem padrão
    const img = document.getElementById("book-img");
    ("Carregando imagem do livro:", `${imagePrefix}${book.image}`);
    img.src = `${imagePrefix}${book.image}`;
    img.onerror = () => {
        img.src = `${imagePrefix}assets/imgs/image-default.png`;
    };
    document.getElementById("book-title").innerText = book.title;
    document.getElementById("book-author").innerText = book.author;
    document.getElementById("book-genre").innerText = book.genre;
    document.getElementById("book-rating").innerText = book.rating;
    document.getElementById("book-pages").innerText = book.pages;
    document.getElementById("book-year").innerText = book.year;
    document.getElementById("book-price").innerText = book.price;
    document.getElementById("book-description").innerText = book.description;
}