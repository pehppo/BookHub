async function loadBookDetails(bookId) {
    const response = await fetch(
        `https://seu-app.onrender.com/books/${bookId}`
    );

    const book = await response.json();

    console.log(book);

    currentBook = book;

    const isInPages = window.location.pathname.includes('/pages/');
    const imagePrefix = isInPages ? '../' : '';

    const img = document.getElementById("book-img");
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