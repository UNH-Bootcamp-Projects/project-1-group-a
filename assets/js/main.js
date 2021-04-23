let youtubeKey = "AIzaSyB3LQ9556IHF2Cvci2B9S6FKyRVtMWlxa0";
let playlistID = "PLopY4n17t8RDnEJnNXSwUbhvs4wNLpMe5";
let youtubeAPI = 
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" +
  playlistID +
  "&key=" +
  youtubeKey;
let titlesArray = [];
let movies = [];
let recentArray = JSON.parse(localStorage.getItem('title')) || [];

// query YouTube API 
fetch(youtubeAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let i = 0; i < 50; i++) {
      let title = data.items[i].snippet.title;
      titlesArray.push(title);
      let parts = title.replace("...", " ").split(" from ");
      if (parts.length > 1) {
        let movie = parts[parts.length - 1];
        movies.push({
          movie,
          title,
          item: data.items[i],
          videoId: data.items[i].snippet.resourceId.videoId,
        });
      }
    }
    for (const movie of movies) {
      $("<option>")
        .data("movie", movie)
        .text(movie.movie)
        .attr("value", movie.movie)
        .appendTo("datalist");
    }
  });

  // when a movie title is clicked the page reloads with that movies info
$("input").on("change", (event) => {
  let movieTitle = $(event.currentTarget).val();
  getMovie(movieTitle);
});

let movieKey = "f420df924b19579fea697bc51f4a457d";
// loads info of selected movie to the page
function getMovie(movieTitle) {
  let movie = movies.find((m) => m.movie === movieTitle);
  let query = encodeURIComponent(movieTitle);
  let movieAPI =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    movieKey +
    "&language=en-US&page=1&include_adult=false&query=" +
    query;
    // get video id and concat it to the url for embedded yt video
    $('#youTube').attr("src", "https://www.youtube.com/embed/" + movie.videoId);
  fetch(movieAPI)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      let selectedMovie = data.results[0];
      // title
      $("#movie-title").text(selectedMovie.title);
      // overview
      $("#movie-overview").text(selectedMovie.overview);
      // release date
      $("#release-date").text(selectedMovie.release_date);
      // vote average
      let movieRating = Math.floor(selectedMovie.vote_average / 2);
      $("#movie-rating").empty();
      // rating
      function ratingSystem(movieRating) {
        for (let i = 0; i < movieRating; i++) {
          $("#movie-rating").append($("<i>").attr("class", "fas fa-star"));
        }
        let starRemainder = 5 - movieRating;
        for (let i = 0; i < starRemainder; i++) {
          $("#movie-rating").append($("<i>").attr("class", "far fa-star"));
        }
      }
      let id = selectedMovie.id;
      let watchURL = "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + movieKey + "&language=en-US";
      fetch(watchURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (streamData) {
        let providers = $('.providers').empty();
        for (const rent of streamData.results.US.rent) {
        $('<img>').attr('src', "https://image.tmdb.org/t/p/w45" + rent.logo_path).appendTo(providers);
        }
      });

      ratingSystem(movieRating);
      $('.hidden').removeClass("hidden");
      $('.popcorn').addClass("hidden");

      // poster
      $("#movie-poster").attr(
        "src",
        "https://image.tmdb.org/t/p/w500" + selectedMovie.poster_path
      );

      // add movie title to local storage and append it to a list      
      if (!recentArray.includes(movieTitle)) {
        recentArray.push(movieTitle);
      }
      localStorage.setItem("title", JSON.stringify(recentArray));
      printRecent();
    });
}

// renders recently searched items on the page
function printRecent() {
  let history = $('.history ul').empty();
  for( let title of recentArray) {
    let recentTitle = $('<li>').text(title);
    recentTitle.appendTo(history);
    recentTitle.on('click', () => getMovie(title));
  }
}
printRecent();