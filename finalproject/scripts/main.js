// Dynamic Year Display
document.getElementById('current-year').textContent = new Date().getFullYear();

// Hamburger Nav Toggle
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}