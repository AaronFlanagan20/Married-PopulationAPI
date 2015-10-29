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
//sets format for json
app.set('json spaces', 1);


//*******************HELP STRINGS*******************//
// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send('Try http://127.0.0.1:8000/population/sex/age');
});

//when user goes to /population/sex/age instruct them what to add for json return
app.get('/population/sex/age', function(req, res) {
  res.send('add in to url /females or /males or /both for gender and an age /(1-98) or (99+)');
});

//*****************POPULATION GET REQUESTS******************//
//returns sex and age for all years
app.get('/population/sex/age/:sex/:age', function(req, res) {
	var results = [];
	for(var i = 0; i < popData.length; i++)
		if(popData[i].sex == req.params.sex)
			if(popData[i].age == req.params.age)
				results.push(popData[i]);
	
	res.json(results);
});

// Run the server
var server = app.listen(8000);