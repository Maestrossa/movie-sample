export function search(text) {
  console.log(text);
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach((card) => {
    const title = card.querySelector('#cardtitle').textContent;
    const overview = card.querySelector('.overview').textContent;

    //make the input characters all lowercase and match with cards
    if (title.toLowerCase().includes(text.toLowerCase()) || overview.toLowerCase().includes(text.toLowerCase())) {
      //show the cards that match with the title or keywords
      card.style.display = 'block';
    } else {
      //hide the cards that don't match with the title
      card.style.display = 'none';
    }
  });
}
