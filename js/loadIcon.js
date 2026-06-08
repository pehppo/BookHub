function loadIcon(isLoading) {
    const gridContent = document.querySelectorAll('.books-grid');
    if (isLoading) {
        gridContent.forEach((content) => {
            return content.innerHTML = `
            <div class="loadingIcon">
            </div>
            `
        })
        // Show loading icon
    } else {
        gridContent.forEach((content) => {
            return content.innerHTML = ``
        })
        // Hide loading icon
    }
}
window.loadIcon = loadIcon