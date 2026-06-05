async function initCarousel(booksData) {

    if (!booksData || !booksData.length) {
        console.error("Nenhum livro encontrado.");
        return;
    }

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {

        const slider = carousel.querySelector('.slides');
        const btnLeft = carousel.querySelector('.prev');
        const btnRight = carousel.querySelector('.next');
        const books = carousel.querySelectorAll('.book-card');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (!slider || !btnLeft || !btnRight || !books.length) return;

        let index = 0;
        let lastVisible = [];

        function getVisibleItems() {
            const containerWidth = carousel.offsetWidth;
            const itemWidth = books[0].offsetWidth;

            return Math.max(
                1,
                Math.floor(containerWidth / itemWidth)
            );
        }

        function createDots() {

            if (!dotsContainer) return;

            dotsContainer.innerHTML = '';

            const totalDots =
                books.length - getVisibleItems() + 1;

            for (let i = 0; i < totalDots; i++) {

                const dot = document.createElement('button');

                dot.classList.add('dot');

                if (i === index) {
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => {
                    index = i;
                    updateSlider();
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {

            if (!dotsContainer) return;

            const dots =
                dotsContainer.querySelectorAll('.dot');

            dots.forEach((dot, i) => {
                dot.classList.toggle(
                    'active',
                    i === index
                );
            });
        }

        function updateVisibleBooks() {

            lastVisible.forEach(book => {
                book.classList.remove(
                    'visible',
                    'first',
                    'last'
                );
            });

            lastVisible = Array.from(books).slice(
                index,
                index + getVisibleItems()
            );

            lastVisible.forEach(book => {
                book.classList.add('visible');
            });

            if (lastVisible.length) {
                lastVisible[0].classList.add('first');
                lastVisible[lastVisible.length - 1]
                    .classList.add('last');
            }
        }

        function updateSlider() {

            const gap =
                parseInt(getComputedStyle(slider).gap) || 0;

            const itemWidth =
                books[0].offsetWidth + gap;

            slider.style.transform =
                `translateX(-${index * itemWidth}px)`;

            updateVisibleBooks();
            updateDots();
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

        window.addEventListener('resize', () => {

            const maxIndex =
                books.length - getVisibleItems();

            if (index > maxIndex) {
                index = Math.max(0, maxIndex);
            }

            createDots();
            updateSlider();
        });

        createDots();
        updateSlider();

        setInterval(nextSlide, 3000);
    });
}