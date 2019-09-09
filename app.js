/* eslint-disable react/wrap-multilines */
/* eslint-disable react/require-extension */
/* eslint-disable react/jsx-sort-prop-types */
var express = require('express');
var request = require('request');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', function(req, res) {
    var query = encodeURI(req.query.search);
    var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
    console.log(url);
   request({url}, (error, response, body) => {
        if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
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
    const url = `http://www.omdbapi.com/?t=${movie_title}&y=${movie_year}&apikey=thewdb`;
    console.log(url);
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