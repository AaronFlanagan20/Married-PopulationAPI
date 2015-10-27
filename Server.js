// Import the fs module so that we can read in files.
var fs = require('fs');
// Import express to create and configure the HTTP server.
var express = require('express');

//Read in population file and parse it for json
var popData = JSON.parse(fs.readFileSync('Population 2011 - 2014.json','utf8')); 

//Read in marriage file and parse it for json
var marData = JSON.parse(fs.readFileSync('Marriages 2011 - 2014.json','utf8')); 

//create http
var app = express();

//*******************MAIN SCREEN*******************//
// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send('Try http://127.0.0.1:8000/population');
});

//*****************POPULATION GET REQUESTS******************//
app.get('/population/:Sex/:Age', function(req, res) {
  res.json(popData[req.params.Sex]);
});


// Run the server
var server = app.listen(8000);