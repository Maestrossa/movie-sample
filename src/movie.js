// TMDB Data API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzJmZDMwMWU4MWU1Y2YyOGJlYmViMzcwMjM2YzBmNyIsInN1YiI6IjY2Mjc2ZmVhNjNlNmZiMDE0YmZiZTk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lKD8GZDf3VZtpPZMBkdOiG-pqZrgsVnNurYE6Y4Y8Xo',
  },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    //assign the result data to 'movies'
    let movies = response.results;

    //assign 'movieCardsFlex' class to 'movieCardSection' const
    const movieCardSection = document.querySelector('.movieCardsFlex');

    //use the 'createMovieCard' function to make a map array. use .join('') to prevent , to appear since it's an array
    movieCardSection.innerHTML = movies.map(createMovieCard).join('');

    //select the 'movie-card' class which contains the 20 cards that were made by the code above and assign it to movieCards const
    const movieCards = document.querySelectorAll('.movie-card');

    //now all of the cards are selected, go through each of them and put onclick event
    movieCards.forEach((movieCard) => {
      movieCard.addEventListener('click', () => {
        alert('Movie ID Number is ' + movieCard.id + '.');
      });
    });
  });

//make a function that creates a HTML string for a card
export function createMovieCard(data) {
  return `
      <div class="movie-card" id="${data.id}">
      <img src="https://image.tmdb.org/t/p/w200/${data.poster_path}" class="card-img" />
      <p id="cardtitle">${data.title}</p>
      <p class="rating">⭐️ <span class="rating-color">${data.vote_average}</span></p>
      <p class="overview">${data.overview}</p>
      </div>`;
}
