var express = require('express'),
	archive = require('./routes/archive');

r = require('rethinkdb');

var connection = r.connect( {host: '127.0.0.1', port: 28015});
connection.then(function(conn) {
//	r.dbCreate('archivedb').run(conn, function(err, res) {
//        	if (err) throw err;
//        	console.log(res);
//	});
//	r.db('archivedb').tableCreate('archives').run(conn, function(err, res) {
  //      	if (err) throw err;
//        	console.log(JSON.stringify(res, null, 2));
//	});
	r.db('archivedb').table('archives').insert({url: 'http://edina.ac.uk'}).run(conn, function(err, res) {
		if (err) throw err;
		console.log(res);
	});
}).error(function(err) {
	console.log(err);
});

var app = express();
app.get('/archive', archive.findAll);
app.get('/archive/:id', archive.findById);
app.listen(3000);
console.log('Listening on port 3000');
