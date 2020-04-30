const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fetch   = require('node-fetch');

const { musicGenre } = require('./musicGenre');

const OAUTH_TOKEN = ""
const URL = "https://api.spotify.com/v1/recommendations?limit=1&market=US&seed_genres=";


let musicRouter = express.Router();

musicRouter.use(bodyParser.json());
musicRouter.use(cors());


musicRouter.get('/:mood', (req, res, next) => {
    const mood = req.params.mood;
    const genre = findGenre(mood);
    
    const endpoint = URL + genre;

    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${OAUTH_TOKEN}`
        }
    })
        
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


//function that compares the mood input to the music genre object
function findGenre(mood){
    mood = mood.replace(':','');
    return musicGenre[mood];
}


module.exports = musicRouter;