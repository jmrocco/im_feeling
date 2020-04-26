//main javascript file for the routing and server logic

const express = require('express');
const app = express();

const { data } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT ,() => {
    console.log("Listening on port....")
});

app.get('/api',(req,res,next)=>{
    console.log(req.query.input);
    res.send();
});
