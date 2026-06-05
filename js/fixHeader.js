window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    const isMobile = window.innerWidth <= 768;

    if (
        (isMobile && window.scrollY > 100 && window.innerHeight < 700) ||
        (!isMobile && window.scrollY > 100)
    ) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});