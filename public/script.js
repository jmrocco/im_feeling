/*
The purpose of this file is to interact with 'index.html'
- Takes information from the checkboxes and the input box
  and sends requests based upon that information
-Recieves responses back and outputs to 'index.html'
 accordingly
 Note:
  - Not always will the criteria for the content card be
  available 
*/


//buttons,checkboxes, input box, checkboxes, and loading icon
const fetchButton = document.getElementById('fetch-button');
const resetButton = document.getElementById('reset-button');
const movieCheckbox = document.getElementById("movies");
const bookCheckbox = document.getElementById("books");
const musicCheckbox = document.getElementById("music");
const inputBox = document.getElementById("input");
const loader = document.querySelector(".loader");  

//content card components
const titleContent = document.getElementById('title_content');
const releaseDateContent = document.getElementById('release_date');
const descriptionContent = document.getElementById('descrip');
const imageContent = document.getElementById("image_content");
const contentCard = document.getElementById("card");

//global variables to set content card content
let title,image,releaseDate,description;

//resets the input box, checkboxes, and the loading icon
const reset = () => {

  inputBox.value = "";

  bookCheckbox.checked = false;
  movieCheckbox.checked = false;
  musicCheckbox.checked = false;
  
  loader.style.display = "none";

}

//clears the content card from the screen
const clearCard = () =>{

  titleContent.innerHTML = "";
  releaseDateContent.innerHTML = "";
  descriptionContent.innerHTML = "";

  imageContent.src = "";
  contentCard.style.backgroundColor = "";
  contentCard.style.boxShadow = "";

  imageContent.style.border = "";
  imageContent.style.backgroundColor = "";
  
}

/* Main event listener for the Go button
  - Sends the input box and checkbox information
  to the appropriate router and handles where the
  response is being sent to
*/
fetchButton.addEventListener('click', () => {
  //makes sure the card is empty before continuing
  clearCard();

  //takes the input and the activity checkbox
  const input = inputBox.value;
  const activity = checkActivity();

  //checks to ensure that no information is missing
  if (activity === false){
    titleContent.innerHTML = '<p>You must choose an activity.</p>';
  }else if (input === ""){
    titleContent.innerHTML = '<p>You must specify a mood.</p>';
  }else if (doubleCheck()){
    titleContent.innerHTML = '<p>Please choose ONE activity.</p>';
  }else{

    //brings up the loading icon
    loader.style.display = "initial";

    //sends the request to the appropriate 
    //router
    fetch(`/${activity}/:${input}`)

    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
      console.log("Request failed.");

    }, networkError => {
        console.log(networkError.message);
    })

    /*once it receives the json response
      sends it to the appropriate function
      since each activity has different
      criteria to access variables
    */
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

//reset button event handler that completely resets the form
resetButton.addEventListener('click', () => {

  reset();
  clearCard();

});

//function to check if an activity checkbox is checked
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

//function that takes the response from the movie router
//and outputs movie information
function generateMovie(jsonResponse){

  loader.style.display = "none";
  title = jsonResponse.title;
  image = jsonResponse.poster_path;

  let url = `https://image.tmdb.org/t/p/w185${image}`;

  releaseDate = jsonResponse.release_date;
  description = jsonResponse.overview;

  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = "Release Date: " + releaseDate;
  descriptionContent.innerHTML = descriptionLength(description);

  //ensures that the image will display if applicable
  //else no image will display
  if (image != null || image != undefined){
    imageContent.src = url;
    imageContent.style.border = "8px solid black";
    imageContent.style.backgroundColor = "black";
  }else{
    imageContent.src = "";
    imageContent.style.border = "";
    imageContent.style.backgroundColor = "";
  }
 
  //content card is initally invisible, styling applied
  contentCard.style.backgroundColor = "white";
  contentCard.style.boxShadow= "0px 2px 5px rgba(0, 0, 0, 0.2)";

}
//function that takes the response from the music router
//and outputs music information
function generateMusic(jsonResponse){
  
  loader.style.display = "none";

  title = jsonResponse['tracks'][0]['name'];
  image = jsonResponse['tracks'][0]['album']['images'][1]['url'];
  releaseDate = jsonResponse['tracks'][0]['album']['release_date'];

  //uses function to generate artists variable
  getMusicArtists(jsonResponse);

  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = "Release Date: " + releaseDate;
  descriptionContent.innerHTML = description;

  //ensures that the image will display if applicable
  //else no image will display
  if (image != null || image != undefined){
    imageContent.src = image;
    imageContent.style.border = "8px solid black";
    imageContent.style.backgroundColor = "black";
  }else{
    imageContent.src = "";
    imageContent.style.border = "";
    imageContent.style.backgroundColor = "";
  }

  //content card is initally invisible, styling applied
  contentCard.style.backgroundColor = "white";
  contentCard.style.boxShadow= "0px 2px 5px rgba(0, 0, 0, 0.2)";

}
/*-function that takes the response from the music router
   and outputs music information
Note: 
  -The Open Library API was not reliable for book descriptions,
   thus I also used the Google Books API to accomodate for this.
  -Generating a book recomendation is the slowest, perhaps from
  the Open Library API itself and becaues of the extra call to
  the Google Books API

*/
async function generateBook(jsonResponse){
 
  const index = randomElement(jsonResponse['works']);

  //the open library ID is used to generate the src for the photo
  //since it was more reliable than ISBN
  const OLID = jsonResponse['works'][index]['cover_edition_key'];
  const src = `http://covers.openlibrary.org/b/olid/${OLID}-M.jpg`; 

  //author was not always populated, thus a try and catch statement
  //is necessary
  let author = "";

  try{
    author = jsonResponse['works'][index]['authors'][0]['name'];
    //author will populate the releaseDate section of the content card
    releaseDate = "By " + author;
  }catch{
    console.log("No author found in database.");
    releaseDate ="";
    author ="";
  }

  image = src;
  title = jsonResponse['works'][index]['title'];

  //in order to use Google Books API a query with
  //the title was needed, each word joined by '+'
  let googleTitle = title.split(" ").join("+");
  //for best results, also joins name at the end
  googleTitle += author.split(" ").join("+");
 
  loader.style.display = "none";

  /*created a seperate function to make the call
    to the Google Books API. This is a promise to
    recieve the description from that response
  */
  generateDescriptionGoogle(googleTitle)
    .then(bookDescription => {
      //logic for if there is no description recieved
      if (bookDescription != undefined){
        descriptionContent.innerHTML = descriptionLength(bookDescription);
      }else{
        descriptionContent.innerHTML = "";
        console.log("No description found in database.");
      }
       });

  titleContent.innerHTML = title;
  releaseDateContent.innerHTML = releaseDate;
  
  //checks to make sure the image can be generated
  if (OLID != null && OLID != undefined){
    imageContent.src = image;
    imageContent.style.border = "8px solid black";
    imageContent.style.backgroundColor = "black";
  }else{
    console.log("No image found in database.");
    imageContent.src = "";
    imageContent.style.border = "";
    imageContent.style.backgroundColor = "";
  }

  contentCard.style.backgroundColor = "white";
  contentCard.style.boxShadow= "0px 2px 5px rgba(0, 0, 0, 0.2)";

}

//to fit the length of the card, if the description is too long
//will trim and replace the last few characters with dots
function descriptionLength(bookDescription){

  if (bookDescription.length >= 640){
    return bookDescription.slice(0,640) + " .........";
  }else{
    return bookDescription;
  }

}

/*in the event that there are multiple artists,
  joins all their names in one string
  artists will display in the releaseDate section
  of the content card
*/
function getMusicArtists(jsonResponse){

  let artists = jsonResponse['tracks'][0] ['artists'];
  description = "";

  for (let x = 0; x < artists.length; x++){
    description += " " + artists[x]['name'];
  }

}

//generates a random number for the number
//of works in the array
function randomElement(works){

  const maxNum = works.length;
  return Math.floor(Math.random() * maxNum);

}


//async function to generate the description from the
//Google Books API
async function generateDescriptionGoogle(googleTitle){

  const url = `https://www.googleapis.com/books/v1/volumes?q=${googleTitle}&maxResults=1`;

  //sends and waits for the response
  let response = await fetch(url);
  let detailResponse = await response.json();
  let bookDescription = detailResponse['items'][0]['volumeInfo']['description'];
 
  //instead of setting the global description variable,
  //sends back a new description variable
  return bookDescription;

}


//function to make sure that only one 
//activity checkbox is checked
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
