//main javascript file for the routing and server logic

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { getRandomElement } = require('./routers/utils');
const moviesRouter = require('./routers/movies.js');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/movies', moviesRouter);

app.listen(PORT ,() => {
    console.log("Listening on port....")
});

//simple get request to make sure everything is working
app.get('/api',(req,res,next)=>{
    console.log(req.query.input);
    res.send();
});
