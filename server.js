//main javascript file for the routing and server logic

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const moviesRouter = require('./routers/movies.js');
const musicRouter = require('./routers/music.js');
const booksRouter = require('./routers/books.js');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use('/movies', moviesRouter);
app.use('/music',musicRouter);
app.use('/books',booksRouter);

app.listen(PORT ,() => {
    console.log("Listening on port....")
});

//simple get request to make sure everything is working
app.get('/api',(req,res,next)=>{
    console.log(req.query.input);
    res.send();
});
