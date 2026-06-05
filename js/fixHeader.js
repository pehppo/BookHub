window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    if (window.scrollY > 100 && window.innerHeight < 700) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});