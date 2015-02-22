var createWarc = require('../createWarc');

exports.findAll = function(req, res) {
	r.connect({
		host: '127.0.0.1',
		port: 28015
	}, function(err, conn) {
		if (err) throw err;
		console.log(req.query);
		var startIndex = (req.query.start) ? parseInt(req.query.start) : 0;
		var resultCount = (req.query.count) ? parseInt(req.query.count) : 10;
		if (req.query.url) {
			r.db('archivedb').table('archives').getAll(req.query.url, {
				index: 'url'
			}).slice(startIndex, startIndex + resultCount).run(conn, function(err, dbRes) {
				if (err) throw err;
				var rows = [];
				dbRes.toArray(function(err, result) {
					if (err) throw err;
					res.json(result);
				});
			});
		} else {
			r.db('archivedb').table('archives').slice(startIndex, startIndex + resultCount).run(conn, function(err, dbRes) {
				if (err) throw err;
				var rows = [];
				dbRes.toArray(function(err, result) {
					if (err) throw err;
					res.json(result);
				});
			});
		}
	});
};

exports.findById = function(req, res) {
	if (req.params.id !== undefined) {
		r.connect({
			host: '127.0.0.1',
			port: 28015
		}, function(err, conn) {
			if (err) throw err;
			r.db('archivedb').table('archives').get(req.params.id).run(conn, function(err, dbRes) {
				if (err) throw err;
				console.log(dbRes);
				res.json({
					id: dbRes.id,
					url: dbRes.url
				});
			});
		});
	} else {
		res.status(401).send("Id required");
	}
};

exports.add = function(req, res, conn) {
	console.log(req.body);
	var url = req.body.url;
	if (url === undefined) {
		res.status(401).send("URL not provided");
	} else {
		var requestHeaders = {};
		requestHeaders[url] = url;
		r.connect({
			host: '127.0.0.1',
			port: 28015
		}, function(err, conn) {
			if (err) throw err;
			r.db('archivedb').table('archives').insert({
				"url": url
			}).run(conn, function(err, dbRes) {
				if (err) throw err;
				console.log(dbRes);
				var id = dbRes.generated_keys[0];
				console.log("Id: " + id);
				createWarc.generateWarc({
					method: 'generateWarc',
					url: url,
					id: id
				}, requestHeaders);
				res.json({
					"id": id,
					"url": url
				});
			});
		});
	}
};

exports.getWarcById = function(req, res, conn) {
	if (req.params.id !== undefined) {
		r.connect({
			host: '127.0.0.1',
			port: 28015
		}, function(err, conn) {
			if (err) throw err;
			r.db('archivedb').table('archives').get(req.params.id).run(conn, function(err, dbRes) {
				if (err) throw err;
				console.log(dbRes);
				res.send(dbRes.warc);
			});
		});
	} else {
		res.status(401).send("Id required");
	}
};