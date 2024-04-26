// TMDB Data API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzJmZDMwMWU4MWU1Y2YyOGJlYmViMzcwMjM2YzBmNyIsInN1YiI6IjY2Mjc2ZmVhNjNlNmZiMDE0YmZiZTk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lKD8GZDf3VZtpPZMBkdOiG-pqZrgsVnNurYE6Y4Y8Xo',
  },
};

let topMovies;
let movieMap = new Map();

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    let movies = response['results']; //assign the json data to "movies"
    topMovies = response['results']; // assign it to "map"
    console.log(response['results']);

    //extract the arrays from 'results' and assign each of them to a card
    movies.forEach((a) => {
      createMovieCard(a);
    });
  });

//fetch ID of HTML
let movieCardPost = document.querySelector('.movieCards');
console.log(movieCardPost);

//create cards
function createMovieCard(a) {
  //create div elements in HTML and assign class
  let movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  //put the div elements that movieCard creates into HTML
  movieCard.innerHTML = `
    <div class="card">
      <img src="https://image.tmdb.org/t/p/w200/${a.poster_path}" class="card-img-top" alt="..." />
      <p id="cardtitle">${a.title}</p>
      <p class="votes">⭐️ <span class="rating-color">${a.vote_average}</span></p>
      <p class="overview">${a.overview}</p>
    </div>`;

  //make the created movieCards subordinate to movieCardPost
  movieCardPost.appendChild(movieCard);

  //assign titles & cards to Map elements
  movieMap.set(a.title, movieCard);

  //use addEventListener for onclick action
  movieCard.addEventListener('click', () => {
    const idNumber = a.id;
    alert('Movie ID Number is ' + a.id + '.');
  });
}

//fetch search-input and search-btn ids to enalbe the search function
const searchButton = document.querySelector('#search-btn');
const searchInput = document.getElementById('search-input');
console.log(searchButton);

function search() {
  let text = searchInput.value;
  topMovies.forEach((a) => {
    // let movieTitle = a['title'];

    //make the input characters all lowercase and match with cards
    if (a.title.toLowerCase().includes(text.toLowerCase())) {
      //show the cards that match with the title
      movieMap.get(a.title).style.display = 'block';
    } else {
      //hide the cards that doesn't match with the title
      movieMap.get(a.title).style.display = 'none';
    }
  });
}

//run 'search' function when clicking the search button
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  search();
});

//run 'search' function when entering the text input
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});

//search input status when refreshed
searchInput.focus();
