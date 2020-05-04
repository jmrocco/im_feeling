/* Used the TMDB Movie API (https://www.themoviedb.org/documentation/api) to generate
   movie recommendations by matching mood to genre
   Note:
    - An API key is required to send requests
    - This file is purely for routing thus other modules
      are imported
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fetch   = require('node-fetch');

const { movieGenre } = require('./helper_modules/movieGenre');
const { getRandomElement } = require('./helper_modules/utils');

//INSERT API KEY HERE
const API_KEY = "";
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=`;


let moviesRouter = express.Router();

moviesRouter.use(bodyParser.json());
moviesRouter.use(cors());


moviesRouter.get('/:mood', (req, res, next) => {
    //takes the mood from the parameters recieved
    const mood = req.params.mood;
    //matches mood to a genre table
    const genre = findGenre(mood);
    /*requests retun multiple pages of movies, I've limited
      the pages to 500 and it will randomize which page to
      pull from
    */
    const page = Math.floor(Math.random()* 500);
    const endpoint = URL + page + "&with_genres=" + genre;

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
        //sends the json response to script.js for handling
        res.send(JSON.stringify(getRandomElement(jsonResponse)));
    })

});


//function that matches the mood to the genre
function findGenre(mood){
    mood = mood.replace(':','');
    return movieGenre(mood);
}


module.exports = moviesRouter;