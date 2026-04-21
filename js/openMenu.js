const menuButton = document.getElementById('menu-icon');
menuButton.addEventListener('click', function () {
    const navMobile = document.querySelector('.nav-mobile');
    navMobile.classList.toggle('opened');
});