console.log('Carousel script loaded.');

async function loadBooks() {

    const response = await fetch('./assets/api/books.json');

    const data = await response.json();

    return data;

}
async function initCarousel() {
    const data = await loadBooks();
    const books = data?.books;
    if (!books) {
        console.error("Nenhum livro encontrado.");
        return;
    }

    console.log('Initializing carousel...');
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

        function updateSlider() {

            const gap = parseInt(getComputedStyle(slider).gap) || 0;
            const itemWidth = books[0].offsetWidth + gap;

            slider.style.transform =
                `translateX(-${index * itemWidth}px)`;
        }

        function nextSlide() {

            const maxIndex =
                books.length - getVisibleItems();

            index++;

            if (index > maxIndex) {
                index = 0;
            }

            updateSlider();
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

        setInterval(nextSlide, 3000);

        updateSlider();
    });
}

initCarousel();