//This JavaScript file routes the requests to their respective
//routers

const express = require('express');
const app = express();

const moviesRouter = require('./routers/movies.js');
const musicRouter = require('./routers/music.js');
const booksRouter = require('./routers/books.js');

//local host port
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use('/movies', moviesRouter);
app.use('/music',musicRouter);
app.use('/books',booksRouter);

app.listen(PORT ,() => {
    console.log("Listening on port....")
});
