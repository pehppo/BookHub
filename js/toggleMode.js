document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-mode`);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');

        document.body.classList.remove('dark-mode', 'light-mode');

        const newTheme = isDark ? 'light' : 'dark';
        document.body.classList.add(`${newTheme}-mode`);

        localStorage.setItem('theme', newTheme);
    });
});