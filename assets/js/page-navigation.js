/* Shared navigation bridge for the separate portfolio pages. */
const portfolioPages = ['home.html','about.html','research.html','projects.html','skills.html','contact.html'];
function navigateToPage(index) {
  index = Number(index);
  if (!Number.isInteger(index) || index < 0 || index >= portfolioPages.length) return;
  if (window.parent !== window && typeof window.parent.goToPage === 'function') {
    window.parent.goToPage(index);
  } else {
    window.location.href = 'index.html#page-' + index;
  }
}
function setupStandaloneNav() {
  if (window.parent !== window) document.body.classList.add('inside-book');
}
window.addEventListener('DOMContentLoaded', setupStandaloneNav);
