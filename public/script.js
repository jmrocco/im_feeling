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
  inputBox.value = "";

  bookCheckbox.checked = false;
  movieCheckbox.checked = false;
  musicCheckbox.checked = false;

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
  }else if (doubleCheck()){
    titleContent.innerHTML = '<p>Please choose ONE activity.</p>';
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
        }else{
          generateBook(jsonResponse);
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

  title = jsonResponse.title;
  image = jsonResponse.poster_path;

  let url = `https://image.tmdb.org/t/p/w185${image}`;

  releaseDate = jsonResponse.release_date;
  description = jsonResponse.overview;
 
  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = "Release Date: " + releaseDate;
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

async function generateBook(jsonResponse){
  console.log(jsonResponse);
  const index = randomElement(jsonResponse['works']);
  const OLID = jsonResponse['works'][index]['cover_edition_key'];
  const src = `http://covers.openlibrary.org/b/olid/${OLID}-M.jpg`;

  title = jsonResponse['works'][index]['title'];

  console.log(title + " " + index);
  let author;
  try{
    author = jsonResponse['works'][index]['authors'][0]['name'];
  }catch{
    console.log("No author in database:Error")
  }
  image = src;
  releaseDate = "By " + author;
  const googleTitle = title.split(" ").join("+");
 
     
  generateDescriptionGoogle(googleTitle)
    .then(bookDescription => {
      if (bookDescription != undefined){
        descriptionContent.innerHTML = descriptionLength(bookDescription);
      }else{
        descriptionContent.innerHTML = "";
      }
       });

  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = releaseDate;
     
  
  imageContent.src = image;
  contentCard.style.backgroundColor = "white";


}

function descriptionLength(bookDescription){
  console.log(bookDescription.length);
  if (bookDescription.length >= 640){
    return bookDescription.slice(0,640) + " .........";
  }else{
    return bookDescription;
  }

}

function getMusicArtists(jsonResponse){
  let artists = jsonResponse['tracks'][0] ['artists'];
  description = "";

  
  for (let x = 0; x < artists.length; x++){
    description += " " + artists[x]['name'];
  }
}

function randomElement(works){
  const maxNum = works.length;
  return Math.floor(Math.random() * maxNum);
}

async function generateDescriptionGoogle(googleTitle){
  const url = `https://www.googleapis.com/books/v1/volumes?q=${googleTitle}&maxResults=1`;

  let response = await fetch(url);
  let detailResponse = await response.json();
  console.log(detailResponse);
  let bookDescription = detailResponse['items'][0]['volumeInfo']['description'];
 
  return bookDescription;
}

function doubleCheck(){
  const book = bookCheckbox.checked;
  const music = musicCheckbox.checked;
  const movie = movieCheckbox.checked;

  if (book && music){
    return true;
  }else if (book && movie){
    return true;
  }else if (movie && music){
    return true;
  }else{
    return false;
  }

}
