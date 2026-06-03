
async function initCarousel(books) {
    console.log(books);
    if (!books || !books.length) {
        console.error("Nenhum livro encontrado.");
        return;
    }

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {

        const slider = carousel.querySelector('.slides');
        const btnLeft = carousel.querySelector('.prev');
        const btnRight = carousel.querySelector('.next');
        const books = carousel.querySelectorAll('.book-card');

        if (!slider || !btnLeft || !btnRight || !books.length) return;

        let index = 0;

        function getVisibleItems() {
            const containerWidth = carousel.offsetWidth;
            const itemWidth = books[0].offsetWidth;

            return Math.floor(containerWidth / itemWidth);

        }
        let lastVisible = [];

        function updateVisibleBooks() {

            lastVisible.forEach(book => {
                book.classList.remove('visible');
                book.classList.remove('first', 'last');
            });

            lastVisible = Array.from(books).slice(
                index,
                index + getVisibleItems()
            );

            lastVisible.forEach(book => {
                book.classList.add('visible');
                book.classList.remove('first', 'last');
            });
            lastVisible[0].classList.add('first');
            lastVisible[lastVisible.length - 1].classList.add('last');
        }
        function updateSlider() {

            const gap = parseInt(getComputedStyle(slider).gap) || 0;
            const itemWidth = books[0].offsetWidth + gap;

            slider.style.transform =
                `translateX(-${index * itemWidth}px)`;
            updateVisibleBooks();
        }

        function nextSlide() {

            const maxIndex =
                books.length - getVisibleItems();

            index++;

            if (index > maxIndex) {
                index = 0;
            }

            updateSlider();
            updateVisibleBooks();

        }

        function prevSlide() {

            const maxIndex =
                books.length - getVisibleItems();

            index--;

            if (index < 0) {
                index = maxIndex;
            }

            updateSlider();
        }

        btnRight.addEventListener('click', nextSlide);
        btnLeft.addEventListener('click', prevSlide);

        window.addEventListener('resize', updateSlider);
        window.addEventListener('resize', () => {
            updateSlider();
            updateVisibleBooks();
        });
        setInterval(nextSlide, 3000);
        updateSlider();
    });
}
