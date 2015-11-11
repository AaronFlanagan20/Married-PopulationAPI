//******************************SETUPS*******************************//
// Import the fs module so that we can read in files.
var fs = require('fs');
// Import express to create and configure the HTTP server.
var express = require('express');

//create http
var app = express();
//sets format for json
app.set('json spaces', 1);

//require pouchdb
var pouchdb = require('pouchdb');
pouchdb.plugin(require('pouchdb-quick-search'));

//create database
var db = new pouchdb('files');
//******************************FINISH SETUPS***************************//

//******************************HELP STRINGS***************************//
// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send('Try http://127.0.0.1:8000/population/sex/age or http://127.0.0.1:8000/marriage/sex/age');
});

//when user goes to /population/sex/age instruct them what to add for json return
app.get('/population/sex/age', function(req, res) {
  res.send('add in to url /female or /male or /both for gender and an age /(1-98) or (99+)');
});

//when user goes to /marriage/sex/age instruct them what to add for json return
app.get('/marriage/sex/age', function(req, res) {
  res.send('add in to url /female or /male for gender and an age /(20-49) or (all) || Note: numbers are per thousand 3.1 = 3100');
});
//**************************FINISH HELP STRINGS***************************//

//**************************DATABASE FUNCTIONS****************************//
function addFiles() {
//Read in population file and parse it for json
var popData = JSON.parse(fs.readFileSync('Population 2011 - 2014.json','utf8')); 

//Read in marriage file and parse it for json
var marData = JSON.parse(fs.readFileSync('Marriages 2011 - 2014.json','utf8')); 

	//add population json into database
	for (var i = 0; i < popData.length; i++) {
	  db.post(popData[i], function callback(err, result) {
	    if (!err) {
	      	//do nothing
	    }else{
	    	console.log(err);
	    }
	  });
  };
  	console.log('Added popData into database');

  	//add marriage json in database
  	for (var i = 0; i < marData.length; i++) {
  	  db.post(marData[i], function callback(err, result) {
	    if (!err) {
	      	//do nothing
	    }else{
	    	console.log(err);
	    }
	  });
  	};
  	console.log('Added marData into database');
}

function printFiles(){
	db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
}

addFiles();
//************************FINSHDATABASE FUNCTIONS****************************//	

//************************POPULATION GET REQUESTS*************************//
//returns sex and age for all years
app.get('/population/sex/age/:sex/:age', function(req, res) {

	var returned = db.search({
		query: req.params.sex,	
		fields: {
			'age': req.params.age,
			'sex': req.params.sex
		},
		include_docs: true,
		filter: function(doc){
			return doc.age == req.params.age && doc.sex == req.params.sex;
		}
	}, function(err, result){
		if(err){
			console.log(err);
		}else{
			console.log(result);
		}
	});
	
	res.json(returned);
});

//******************** FINISH POPULATION GET REQUESTS *********************//

//******************** MARRIAGE GET REQUESTS **************************//

//returns sex and age for married people for all years
app.get('/marriage/sex/age/:sex/:age', function(req, res) {
	var results = [];
	for(var i = 0; i < db.length; i++)
		if(db[i].sex == db.params.sex)
			if(db[i].age == req.params.age)
				results.push(db[i]);
	
	res.json(results);
});

//******************* FINSIH MARRIAGE GET REQUESTS ************************//



// Run the server
var server = app.listen(8000);