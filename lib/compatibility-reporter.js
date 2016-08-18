var loadFeatures = require('./load-features'),
	loadFiles = require('../lib/load-files');

module.exports = {
	report: function(options) {
		var features = loadFeatures(),
			files = loadFiles(options.input);

		console.log(features);
		console.log(files);
	}
};
