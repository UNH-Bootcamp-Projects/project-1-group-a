
document.querySelector('input').addEventListener('change', (event) => {
  
​
  console.log(event.currentTarget.value) // movie
})


/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
//End of the JS for the menu select button
let youtubeKey = "AIzaSyB3LQ9556IHF2Cvci2B9S6FKyRVtMWlxa0"
let youtubeAPI = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLopY4n17t8RDnEJnNXSwUbhvs4wNLpMe5&key=" + youtubeKey;

fetch(youtubeAPI) 
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data)
  })

  let movieAPI = 

  // movie api
  // release date
  // title
  // overview
  // vote average
  // poster
