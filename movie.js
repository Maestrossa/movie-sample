// TMDB Data API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzJmZDMwMWU4MWU1Y2YyOGJlYmViMzcwMjM2YzBmNyIsInN1YiI6IjY2Mjc2ZmVhNjNlNmZiMDE0YmZiZTk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lKD8GZDf3VZtpPZMBkdOiG-pqZrgsVnNurYE6Y4Y8Xo',
  },
};

let movies = [];

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    //assign the result data to 'movies'
    movies = response.results;

    //with the results assigned to 'movies', makde a function that
    //each movie's data to be placed
    movies.forEach((data) => {
      createMovieCard(data);
    });
  });

let movieMap = new Map();

//create cards
function createMovieCard(data) {
  //fetch ID of HTML
  let movieCardSection = document.querySelector('.movieCardsFlex');

  //create div elements in HTML and assign class
  let movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  //put the div elements that movieCard creates into HTML
  movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w200/${data.poster_path}" class="card-img" />
    <p id="cardtitle">${data.title}</p>
    <p class="rating">⭐️ <span class="rating-color">${data.vote_average}</span></p>
    <p class="overview">${data.overview}</p>
    `;

  //make the created movieCards subordinate to moiveCardSection
  movieCardSection.appendChild(movieCard);

  //assign titles & cards to Map elements
  movieMap.set(data.title, movieCard);

  //use addEventListener for onclick action
  movieCard.addEventListener('click', () => {
    const idNumber = data.id;
    alert('Movie ID Number is ' + data.id + '.');
  });
}

//fetch search-input and search-btn ids to enable the search function
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

function search() {
  let text = searchInput.value;
  movies.forEach((data) => {
    //make the input characters all lowercase and match with cards
    if (
      data.title.toLowerCase().includes(text.toLowerCase()) ||
      data.overview.toLowerCase().includes(text.toLowerCase())
    ) {
      //show the cards that match with the title or keywords
      movieMap.get(data.title).style.display = 'block';
    } else {
      //hide the cards that don't match with the title
      movieMap.get(data.title).style.display = 'none';
    }
  });
}

//run 'search' function when clicking the search button
searchButton.addEventListener('click', (searchEvent) => {
  searchEvent.preventDefault();
  search();
});

//search input status when refreshed
searchInput.focus();
