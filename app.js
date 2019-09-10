/* eslint-disable react/wrap-multilines */
/* eslint-disable react/require-extension */
/* eslint-disable react/jsx-sort-prop-types */
const express = require('express');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/simplebar/dist'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', function(req, res) {
    const query = encodeURI(req.query.search);
    const url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
    /* console.log(url); */
   request({url}, (error, response, body) => {
        if (!error && response.statusCode == 200){
            const data = JSON.parse(body);
            res.status(200); 
            res.render('results', {data:data});
        } else {
            console.log(error);
        }
   });
});

app.get('/detailedResults', (req, res) => {
    const movie_title = encodeURI(req.query.movie_title);
    const movie_year = req.query.year;
    const plot = req.query.plot;
    const url = `http://www.omdbapi.com/?t=${movie_title}&plot=${plot}&y=${movie_year}&apikey=thewdb`;
    /* console.log(url); */
    
    request({url}, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.status(200);
            res.render('detailedResults', {data:data});
        } else {
            console.log(error);
            
        }
    });
    
});

app.listen(3000, function() {
    console.log('Movie App HAS STARTED!!');
});