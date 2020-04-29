//this file is for interacting with the index.html file

const fetchButton = document.getElementById('fetch-button');
const outputContainer = document.getElementById('output-container');
let title,image,releaseDate,description;

const reset = () => {
  outputContainer.innerHTML = '';
}

const renderError = response => {
  outputContainer.innerHTML = `<p>Your request returned an error from the server: </p>
  <p>Code: ${response.status}</p>
  <p>${response.statusText}</p>`;
}

const renderResponse = () => {
  reset();
  outputContainer.innerHTML = '<p>You clicked the input button.</p>';
}

fetchButton.addEventListener('click', () => {
  const input = document.getElementById('input').value;
  const activity = checkActivity();
  
  if (activity === false){
    outputContainer.innerHTML = '<p>You must choose an activity.</p>';
  }else if (input === ""){
    outputContainer.innerHTML = '<p>You must specify a mood.</p>';
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
      
        title = jsonResponse.title;
        image = jsonResponse.poster_path;
        releaseDate = jsonResponse.release_date;
        description = jsonResponse.overview;
        
       generate(title,image,releaseDate,description);
      
    });
  }
});

function checkActivity() {

  const movieCheck = document.getElementById("movies").checked;
  const bookCheck = document.getElementById("books").checked;
  const musicCheck = document.getElementById("music").checked;
 
  if (!movieCheck && !bookCheck && !musicCheck){
    return false;
  }else if(movieCheck){
    return 'movies';
  }else if (bookCheck){
    return 'books';
  }else{
    return 'music';
  }

}

function generate(title,image,releaseDate,description){
  const url = `https://image.tmdb.org/t/p/w185${image}`;
 
  document.getElementById('title_movie').innerHTML = title;
  document.getElementById('release_date').innerHTML = releaseDate;
  document.getElementById('descrip').innerHTML = description;

  document.getElementById("movie_image").src = url;
  document.getElementById("movie_card").style.backgroundColor = "white";


}
