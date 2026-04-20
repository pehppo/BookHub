/* ===================== */
/* NAVEGAÇÃO */
/* ===================== */

// Vai para página de detalhes com o ID na URL
function goToBook(id) {
    window.location.href = `pages/book.html?id=${id}`;
}

// Guarda o livro atual (usado no botão comprar)
let currentBook = null;

/* ===================== */
/* DETALHES DO LIVRO */
/* ===================== */

function loadBook(id) {

    // Busca o livro pelo ID
    const book = books[id];

    if (!book) return;

    currentBook = book;

    // Preenche os dados na tela
    document.getElementById("book-img").src = book.image;
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

const books = {
    1: {
        title: "Hunter x Hunter - Volume 1",
        author: "Yoshihiro Togashi",
        genre: "Ação, Aventura, Fantasia",
        image: "../assets/imgs/hunter-x-hunter-1.jpg",
        rating: "4.9",
        year: 1998,
        pages: 184,
        price: "26,24",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Gon Freecss é um garoto de 12 anos que vive na Ilha da Baleia. Após ser salvo de um Urso-Raposa por um homem chamado Kaito, Gon descobre que seu pai, Ging, não morreu, mas é um dos maiores Hunters do mundo. Determinado a entender por que seu pai escolheu a profissão em vez de criá-lo, Gon faz um trato com sua Tia Mito: se ele conseguir pescar o 'Mestre do Pântano' (um peixe gigante), ele poderá sair da ilha para prestar o Exame Hunter. Ele consegue o feito e parte rumo ao desconhecido."
    },
    2: {
        title: "One Piece - Volume 1",
        author: "Eiichiro Oda",
        genre: "Aventura, Fantasia",
        image: "../assets/imgs/one-piece-1.jpg",
        rating: "4.8",
        year: 1997,
        pages: 192,
        price: "38,42",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Conhecemos o pequeno Luffy na Vila Foosha. Ele admira o pirata Shanks, o Ruivo, e quer provar sua coragem a todo custo (chegando a cortar o próprio rosto). Luffy come acidentalmente a Gomu Gomu no Mi, tornando-se um homem-borracha, mas perdendo a capacidade de nadar. Após Luffy se meter em confusão com bandidos da montanha, Shanks sacrifica seu próprio braço para salvar o garoto de um monstro marinho. Anos depois, Luffy parte para o mar com o chapéu de palha de Shanks e o sonho de ser o Rei dos Piratas."
    },
    3: {
        title: "Naruto - Volume 1",
        author: "Masashi Kishimoto",
        genre: "Ação",
        image: "../assets/imgs/naruto-1.jpg",
        rating: "4.7",
        year: 1999,
        pages: 192,
        price: "31,25",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Naruto é o pária da Vila da Folha, um órfão que vive fazendo pichações e travessuras para chamar atenção. Ele falha no exame de graduação da Academia Ninja por não conseguir fazer um clone básico. Manipulado pelo mestre traidor Mizuki, Naruto rouba o Pergaminho Sagrado de Selos. Ao ser confrontado por seu professor Iruka, Naruto descobre a verdade: ele carrega a Raposa de Nove Caudas dentro de si. Protegendo Iruka, Naruto usa o pergaminho para aprender o Multiclones das Sombras e derrota Mizuki, tornando-se oficialmente um ninja."
    },
    4: {
        title: "Dragon Ball - Volume 1",
        author: "Akira Toriyama",
        genre: "Ação",
        image: "../assets/imgs/dragon-ball-1.jpg",
        rating: "4.8",
        year: 1985,
        pages: 192,
        price: "139,90",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Goku é um menino com cauda que vive sozinho nas montanhas após a morte de seu avô. Ele possui uma força sobre-humana e uma esfera mística (a esfera de 4 estrelas). Ele conhece Bulma, uma adolescente da cidade grande que está em busca das sete Esferas do Dragão para pedir um namorado perfeito. Após um encontro cômico (onde Goku confunde o carro de Bulma com um monstro), ela o convence a acompanhá-la na jornada, agindo como sua guarda-costas."
    },
    5: {
        title: "Hunter x Hunter - Volume 2",
        author: "Yoshihiro Togashi",
        genre: "Ação",
        image: "../assets/imgs/hunter-x-hunter-2.jpg",
        rating: "4.9",
        year: 1998,
        pages: 184,
        price: "26,24",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Gon embarca em um navio cheio de aspirantes a Hunter. O capitão da embarcação, um velho lobo do mar, testa os passageiros submetendo-os a uma tempestade violenta. Apenas três candidatos permanecem tranquilos: Gon, Kurapika e Leorio. O capitão exige saber os motivos de cada um para ser Hunter. Enquanto Kurapika busca vingança pelo seu clã e Leorio diz querer dinheiro, Gon é o único puramente movido pela curiosidade. O capítulo estabelece o início da amizade do trio principal."
    },
    6: {
        title: "One Piece - Volume 2",
        author: "Eiichiro Oda",
        genre: "Aventura",
        image: "../assets/imgs/one-piece-2.jpg",
        rating: "4.8",
        year: 1997,
        pages: 192,
        price: "38,42",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Luffy está à deriva em um barril e acaba sendo resgatado por uma tripulação pirata liderada pela terrível Alvida. Lá, ele conhece Coby, um garoto covarde que trabalha como escravo para ela. Luffy incentiva Coby a seguir seu sonho de entrar para a Marinha e derrota Alvida com facilidade usando seus poderes de borracha. Os dois decidem ir para a base da Marinha em busca de um famoso caçador de piratas que está preso: Roronoa Zoro."
    },
    7: {
        title: "Naruto - Volume 2",
        author: "Masashi Kishimoto",
        genre: "Ação",
        image: "../assets/imgs/naruto-2.jpg",
        rating: "4.7",
        year: 1999,
        pages: 192,
        price: "31,25",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Naruto vai tirar sua foto oficial para o registro ninja (e faz uma maquiagem absurda). Ele conhece Konohamaru, o neto do Terceiro Hokage, que tenta atacar o avô para provar seu valor. Konohamaru fica impressionado com a atitude 'rebelde' de Naruto e vira seu 'discípulo'. Naruto ensina a ele que não existem atalhos para se tornar Hokage, estabelecendo seu código de ética e sua ambição de ser reconhecido por todos."
    },
    8: {
        title: "Dragon Ball - Volume 2",
        author: "Akira Toriyama",
        genre: "Ação",
        image: "../assets/imgs/dragon-ball-2.jpg",
        rating: "4.8",
        year: 1985,
        pages: 192,
        price: "139,90",
        link: "https://www.amazon.com.br/",
        category: ["lancamentos"],
        description: "Enquanto acampam no meio da floresta em uma cápsula tecnológica de Bulma, a dupla enfrenta os perigos da natureza. Goku demonstra sua total ignorância sobre o mundo moderno e sobre a anatomia feminina, gerando situações de humor clássicas da série original. O capítulo foca na dinâmica de opostos entre a inteligência/tecnologia de Bulma e a pureza/força bruta de Goku, enquanto eles seguem o rastro da próxima esfera."
    }
};

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

    container.innerHTML = filtered.map(book => `
        <div class="book-card">
            <img src="${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
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

    container.innerHTML = results.map(book => `
        <div class="book-card">
            <img src="${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
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

    if (filtered.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado nestas categorias.</p>";
        return;
    }

    container.innerHTML = filtered.map(book => `
        <div class="book-card">
            <img src="${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
}

function renderAllBooks() {
    const container = document.getElementById("allBooks");
    if (!container) return;

    const sorted = [...booksArray].sort((a, b) => a.title.localeCompare(b.title));

    container.innerHTML = sorted.map(book => `
        <div class="book-card">
            <img src="${book.image}" onclick="goToBook(${book.id})" style="cursor: pointer;">
            <h3>${book.title}</h3>
            <p class="genre">${book.genre}</p>
            <button onclick="goToBook(${book.id})">Ver livro</button>
        </div>
    `).join("");
}