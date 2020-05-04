/* Used the Open Library (https://openlibrary.org/developers/api)
   and Google Books (https://developers.google.com/books) API to generate
   book recommendations.
   Notes:
   - Neither API requires an API key
   - The Open Library API returns the title, author, and image.
   - The Google Books API returns the description.
   - The implementation of the Google Books API is found in script.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fetch   = require('node-fetch');

const { bookGenre } = require('./helper_modules/bookGenre');

const URL = "https://openlibrary.org/subjects/";


let booksRouter = express.Router();

booksRouter.use(bodyParser.json());
booksRouter.use(cors());


booksRouter.get('/:mood', (req, res) => {
    const mood = req.params.mood;
    const genre = findGenre(mood);
    
    /*limit the number of books recieved to 500 otherwise the
      response takes a considerable amount of time to return
    */
    const endpoint = URL + genre + '.json?limit=500';
    fetch(endpoint)
    .then(response => {
        if(response.ok){
            return response.json();
        } 
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    })
    .then(jsonResponse => {
        res.send(JSON.stringify(jsonResponse));
    })

});


//function that matches mood to book genre
function findGenre(mood){
    mood = mood.replace(':','');
    return bookGenre(mood);
}


module.exports = booksRouter;