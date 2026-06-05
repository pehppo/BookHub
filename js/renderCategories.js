function getCategories(books) {
    const categories = new Set();

    books.forEach(book => {
        book.genre.forEach(genreString => {
            genreString
                .split(',')
                .map(g => g.trim())
                .forEach(g => categories.add(g));
        });
    });

    return [...categories].sort();
}

function renderCategories(books) {
    const categories = getCategories(books);
    const container = document.querySelector('.categories-grid');

    console.log("Categorias encontradas:", categories);
    container.innerHTML = '';

    categories.forEach(category => {
        const button = document.createElement('button');

        button.className = 'category-btn';
        button.textContent = category;

        button.addEventListener('click', (event) => {
            filterByCategory(event, category);
        });

        container.appendChild(button);
    });
}

window.getCategories = getCategories;
window.renderCategories = renderCategories;