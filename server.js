var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
	archive = require('./routes/archive'),
    dbSetup = require('./dbSetup');

r = require('rethinkdb');
dbSetup.setup;

var app = express();
app.use(bodyParser.json());
app.get('/archive', archive.findAll);
app.get('/archive/:id', archive.findById);
app.get('/archive/:id/warc', archive.getWarcById);
app.post('/archive', archive.add);
app.listen(3000);
console.log('Listening on port 3000');
