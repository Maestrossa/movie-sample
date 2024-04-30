import { createMovieCard } from './movie.js';
import { search } from './search.js';

//fetch search-input and search-btn ids to enable the search function
const searchInput = document.getElementById('search-input');
//search input status when refreshed
searchInput.focus();

const searchForm = document.querySelector('.search');
//run 'search' function at the event of searching
// searchButton.addEventListener('click', (searchEvent) => {
searchForm.addEventListener('submit', (searchEvent) => {
  searchEvent.preventDefault();
  search(searchInput.value);
});
