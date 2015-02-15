exports.findAll = function(req, res) {
	res.send([{name: 'archive1'}, {name: 'archive2'}]);
};
exports.findById = function(req, res) {
	res.send({id: req.params.id, name: 'archivename', description: 'archive description'});
};
