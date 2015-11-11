//******************************SETUPS*******************************//
// Import the fs module so that we can read in files.
var fs = require('fs');
// Import express to create and configure the HTTP server.
var express = require('express');

//create http
var app = express();
//sets format for json
app.set('json spaces', 1);

//setup sql
var sql = require('sqlite3').verbose();

//in browser memory
var db = new sql.Database(':memory:');
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

db.serialize(function() {

//Read in population file and parse it for json
var popData = JSON.parse(fs.readFileSync('Population 2011 - 2014.json','utf8')); 

//Read in marriage file and parse it for json
var marData = JSON.parse(fs.readFileSync('Marriages 2011 - 2014.json','utf8')); 
	
	/***POPULATION JSON***/
	db.run('CREATE TABLE popData (age TEXT, sex TEXT, year_2011 INTEGER, year_2012 INTEGER, year_2013 INTEGER, year_2014 INTEGER)');
	var stmt = db.prepare('INSERT INTO popData (age,sex,year_2011,year_2012,year_2013,year_2014) VALUES(?,?,?,?,?,?)');
	for (var i = 0; i < popData.length; i++) {
			stmt.run(popData[i].age,
					 popData[i].sex,
					 popData[i].year_2011,
					 popData[i].year_2012,
					 popData[i].year_2013,
					 popData[i].year_2014
			);
	}		
	stmt.finalize();
	console.log("popData made");
	
	/***MARRIAGE JSON***/
	db.run('CREATE TABLE marData (age TEXT, sex TEXT, year_2011 INTEGER, year_2012 INTEGER, year_2013 INTEGER, year_2014 INTEGER)');
	var stmt = db.prepare('INSERT INTO marData (age,sex,year_2011,year_2012,year_2013,year_2014) VALUES(?,?,?,?,?,?)');
	for (var i = 0; i < marData.length; i++) {
			stmt.run(marData[i].age,
					 marData[i].sex,
					 marData[i].year_2011,
					 marData[i].year_2012,
					 marData[i].year_2013,
					 marData[i].year_2014
			);
	}		
	stmt.finalize();
	console.log("marData made");


});
//************************FINSHDATABASE FUNCTIONS****************************//	
//************************POPULATION GET REQUESTS*************************//

// returns population for single sex and age for all years
//returns one json element
app.get('/population/sex/age/:sex/:age', function(req, res) {
	db.each("SELECT * FROM popData WHERE sex = '" + req.params.sex + "' AND age = '" + req.params.age +"' ", function(err, row) {
		res.json(addToArray(row));
	});
});

// return population for all sex and age for specific year
//returns all json elements with one year
app.get('/population/year/:year', function(req, res) {
	db.each("SELECT age,sex, "+getYear(req.params.year)+" FROM popData WHERE'" + req.params.year +"' GROUP BY age ORDER BY sex DESC", function(err, row) {
		res.json(addToArray(row));
	});
});

//returns population for age and all sex's(male,female,both) for specific given year
// returns 3 json elements
app.get('/population/age/year/:age/:year', function(req, res) {
	db.each("SELECT age, sex, "+getYear(req.params.year)+" FROM popData WHERE age = '" + req.params.age + "' AND'"+ req.params.year +"' GROUP BY age ORDER BY sex DESC", function(err, row) {
			res.json(addToArray(row));
	});
});

// return whole population array 
//returns all json elements
app.get('/population/all', function(req, res) {
	db.each("SELECT * FROM popData", function(err, row) {
		res.json(addToArray(row));
	});
});

//******************** FINISH POPULATION GET REQUESTS *********************//
//******************** MARRIAGE GET REQUESTS **************************//

// returns marriage for single sex and age for all years
//returns one json element
app.get('/marriage/sex/age/:sex/:age', function(req, res) {
	db.each("SELECT * FROM marData WHERE sex = '" + req.params.sex + "' AND age = '" + req.params.age +"' ", function(err, row) {
		res.json(addToArray(row));
	});
});

// return marriage for all sex and age for specific year
//returns all json elements with one year
app.get('/marriage/year/:year', function(req, res) {
	db.each("SELECT age,sex, "+getYear(req.params.year)+" FROM marData WHERE'" + req.params.year +"' GROUP BY age ORDER BY sex DESC", function(err, row) {
		res.json(addToArray(row));
	});
});

//returns marriage for age and all sex's(male,female,both) for specific given year
// returns 3 json elements
app.get('/marriage/age/year/:age/:year', function(req, res) {
	db.each("SELECT age, sex, "+getYear(req.params.year)+" FROM marData WHERE age = '" + req.params.age + "' AND'"+ req.params.year +"' GROUP BY age ORDER BY sex DESC", function(err, row) {
			res.json(addToArray(row));
	});
});

// return whole marriage array 
//returns all json elements
app.get('/marriage/all', function(req, res) {
	db.each("SELECT * FROM marData", function(err, row) {
		res.json(addToArray(row));
	});
});
//******************* FINSIH MARRIAGE GET REQUESTS ************************//

//add all return values to array
function addToArray(row){
	var results = [];
	results.push(row);
	return results;
}

//return what year it is based on parameter passed in
function getYear(year){
	var x;
	if(year == 2011){
		x = "year_2011";
	}else if (year == 2012) {
		x = "year_2012";
	}else if (year == 2013) {
		x = "year_2013";
	}else if (year == 2014) {
		x = "year_2014";
	}

	return x;
}


// Run the server
var server = app.listen(8000);