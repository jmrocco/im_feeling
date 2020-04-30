//this file is for interacting with the index.html file

//buttons,checkboxes, and input boxes
const fetchButton = document.getElementById('fetch-button');
const resetButton = document.getElementById('reset-button');
const movieCheckbox = document.getElementById("movies");
const bookCheckbox = document.getElementById("books");
const musicCheckbox = document.getElementById("music");
const inputBox = document.getElementById("input");

//content card
const titleContent = document.getElementById('title_content');
const releaseDateContent = document.getElementById('release_date');
const descriptionContent = document.getElementById('descrip');
const imageContent = document.getElementById("image_content");
const contentCard = document.getElementById("card");

let title,image,releaseDate,description;

const reset = () => {
  
  titleContent.innerHTML = "";
  releaseDateContent.innerHTML = "";
  descriptionContent.innerHTML = "";

  imageContent.src = "";
  contentCard.style.backgroundColor = "";

}

const renderError = response => {
  titleContent.innerHTML = `<p>Your request returned an error from the server: </p>
  <p>Code: ${response.status}</p>
  <p>${response.statusText}</p>`;
}

fetchButton.addEventListener('click', () => {
  const input = inputBox.value;
  const activity = checkActivity();
  
  if (activity === false){
    titleContent.innerHTML = '<p>You must choose an activity.</p>';
  }else if (input === ""){
    titleContent.innerHTML = '<p>You must specify a mood.</p>';
  }else{
    fetch(`/${activity}/:${input}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    })
    .then(jsonResponse => {
        if (activity === "movies"){
          generateMovie(jsonResponse);
        }else if (activity === "music"){
         generateMusic(jsonResponse);
        }
      
    });
  }
});

resetButton.addEventListener('click', () => {
  reset();
});

function checkActivity() {
  if (!movieCheckbox.checked && !bookCheckbox.checked && !musicCheckbox.checked){
    return false;
  }else if(movieCheckbox.checked){
    return 'movies';
  }else if (bookCheckbox.checked){
    return 'books';
  }else{
    return 'music';
  }

}

function generateMovie(jsonResponse){
  const url = `https://image.tmdb.org/t/p/w185${image}`;
  title = jsonResponse.title;
  image = jsonResponse.poster_path;
  releaseDate = jsonResponse.release_date;
  description = jsonResponse.overview;
 
  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = releaseDate;
  descriptionContent.innerHTML = description;

  imageContent.src = url;
  contentCard.style.backgroundColor = "white";

}

function generateMusic(jsonResponse){
  title = jsonResponse['tracks'][0]['name'];
  image = jsonResponse['tracks'][0]['album']['images'][1]['url'];
  releaseDate = jsonResponse['tracks'][0]['album']['release_date'];
  getMusicArtists(jsonResponse);

  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = releaseDate;
  descriptionContent.innerHTML = description;

  imageContent.src = image;
  contentCard.style.backgroundColor = "white";

}

function getMusicArtists(jsonResponse){
  let artists = jsonResponse['tracks'][0]['artists'];
  description = "";
  
  for (let x = 0; x < artists.length; x++){
    description += " " + artists[x]['name'];
  }
}