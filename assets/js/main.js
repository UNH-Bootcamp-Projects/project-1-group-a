let youtubeKey = "AIzaSyB3LQ9556IHF2Cvci2B9S6FKyRVtMWlxa0"
let playlistID = "PLopY4n17t8RDnEJnNXSwUbhvs4wNLpMe5"
let youtubeAPI = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistID + "&key=" + youtubeKey;
let titlesArray = []
let movies = []
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
      } else {
        console.log(title)
      }
    }
    console.log(movies)
  })



  let movieAPI = "https://https://api.themoviedb.org/3/movie/550?api_key=" + movieKey
  let movieKey = "f420df924b19579fea697bc51f4a457d"

  // movie api
  // release date
  // title
  // overview
  // vote average
  // poster
