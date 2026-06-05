function loadIcon(isLoading) {
    console.log(isLoading)
    const gridContent = document.querySelectorAll('.books-grid');
    if (isLoading) {
        console.log(gridContent)
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