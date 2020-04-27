const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fetch   = require('node-fetch');

const { movieGenre } = require('./movieGenre');
const { getRandomElement } = require('./utils');

const API_KEY = "";
const page = Math.floor(Math.random()* 500);
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=`;



let moviesRouter = express.Router();

moviesRouter.use(bodyParser.json());
moviesRouter.use(cors());


moviesRouter.get('/:mood', (req, res, next) => {
    const mood = req.params.mood;
    const genre = findGenre(mood);

    const endpoint = URL + genre;

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
        console.log("Movie response success:200")
        res.send(JSON.stringify(getRandomElement(jsonResponse)));
    })

});


//function that compares the mood input to the movie genre object
function findGenre(mood){
    mood = mood.replace(':','');
    return movieGenre[mood];
}


module.exports = moviesRouter;