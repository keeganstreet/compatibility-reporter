var fs = require('fs'),
	path = require('path');

module.exports = function() {
	var features = {};

	fs.readdirSync('./lib/features').forEach(function(file) {
		if (path.extname(file) !== '.js') {
			return;
		}

		features[file.slice(0, -3)] = require('./features/' + file);
	});

	return features;
};
