
document.querySelector('input').addEventListener('change', (event) => {
  
  console.log(event.currentTarget.value) // movie
})


/* If the user clicks anywhere outside the select box,
then close all select boxes: */
// document.addEventListener("click", closeAllSelect);
//End of the JS for the menu select button
let youtubeKey = "AIzaSyB3LQ9556IHF2Cvci2B9S6FKyRVtMWlxa0"
let playlistID = "PLopY4n17t8RDnEJnNXSwUbhvs4wNLpMe5"
let youtubeAPI = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistID + "&key=" + youtubeKey;
let titlesArray = []
let movies = []

document.querySelector('input').addEventListener('change', (event) => {
  // console.log(event.currentTarget.value) // movie
})

fetch(youtubeAPI) 
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    for (let i = 0; i < 50; i++) {
      let title = data.items[i].snippet.title
      titlesArray.push(title)
      let parts = title.replace("...", " ").split(" from ")
      if (parts.length > 1) {
        let movie = parts[parts.length - 1]
        movies.push({
          movie,
          title,
          item: data.items[i],
          videoId: data.items[i].snippet.resourceId.videoId,
        })
      }
    }
    console.log(movies)
    for (const movie of movies) {
      $('<option>')
        .data('movie', movie)
        .text(movie.movie)
        .attr('value', movie.movie)
        .appendTo('datalist')
    }
  })

$('input').on('change', (event) => {
  let movieTitle = $(event.currentTarget).val()
  getMovie(movieTitle)
})

let movieKey = "f420df924b19579fea697bc51f4a457d"
function getMovie(movieTitle) {
  let movie = movies.find((m) => m.movie === movieTitle)
  let query = encodeURIComponent(movieTitle)
  let movieAPI = "https://api.themoviedb.org/3/search/movie?api_key=" + movieKey + "&language=en-US&page=1&include_adult=false&query=" + query;
  fetch(movieAPI)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data.results[0])
    })
}
// release date
// title
// overview
// vote average
// poster
