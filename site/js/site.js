/* ================================================
   Crash Course Tutorial Website — Navigation & Interactions
   ================================================ */

// Fullscreen slide embed
function toggleFullscreen(iframe) {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  }
}

// Mark active sidebar link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href.replace('./', ''))) {
      link.classList.add('active');
    }
  });
});
