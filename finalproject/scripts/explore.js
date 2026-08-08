import './main.js';

const grid = document.getElementById('game-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const dialog = document.getElementById('game-dialog');
const dialogBody = document.getElementById('dialog-body');
const closeDialog = document.getElementById('close-dialog');

let gamesData = [];

// Asynchronous Fetch with try...catch Block
async function fetchGames() {
  try {
    const response = await fetch('data/games.json');
    if (!response.ok) throw new Error('Failed to load games data');
    gamesData = await response.json();
    renderCards(gamesData);
  } catch (error) {
    console.error('Error:', error);
    grid.innerHTML = `<p class="error">Unable to load collection. Please try again later.</p>`;
  }
}

// Render dynamic HTML cards using Array.map & Template Literals
function renderCards(games) {
  grid.innerHTML = '';
  if (games.length === 0) {
    grid.innerHTML = '<p>No games matched your criteria.</p>';
    return;
  }

  const cardsHTML = games.map(game => `
    <article class="card">
      <img src="${game.image}" alt="${game.title}" loading="lazy" width="250" height="180">
      <h3>${game.title}</h3>
      <p><strong>Category:</strong> ${game.category}</p>
      <p><strong>Players:</strong> ${game.players}</p>
      <p><strong>Rating:</strong> ⭐ ${game.rating}</p>
      <button class="card-btn" data-id="${game.id}">View Details</button>
    </article>
  `).join('');

  grid.innerHTML = cardsHTML;

  // Event Listeners for Modal popups
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const gameId = e.target.getAttribute('data-id');
      showModal(gameId);
    });
  });
}

// Open and display item inside Modal Dialog
function showModal(id) {
  const game = gamesData.find(g => g.id === id);
  if (!game) return;

  dialogBody.innerHTML = `
    <h2>${game.title}</h2>
    <p><strong>Category:</strong> ${game.category}</p>
    <p><strong>Play Time:</strong> ${game.time}</p>
    <p><strong>Players:</strong> ${game.players}</p>
    <p>${game.description}</p>
  `;
  dialog.showModal();
}

closeDialog.addEventListener('click', () => dialog.close());

// Real-time filtering listeners
function filterGames() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderCards(filtered);
}

searchInput.addEventListener('input', filterGames);
categoryFilter.addEventListener('change', filterGames);

// Initialize fetch request
fetchGames();