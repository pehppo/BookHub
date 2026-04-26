window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    console.log(header);
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});