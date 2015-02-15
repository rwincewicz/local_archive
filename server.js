var express = require('express'),
	archive = require('./routes/archive');

var app = express();
app.get('/archive', archive.findAll);
app.get('/archive/:id', archive.findById);
app.listen(3000);
console.log('Listening on port 3000');
