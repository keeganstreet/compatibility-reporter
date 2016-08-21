var loadFeatures = require('./load-features'),
	loadFiles = require('../lib/load-files'),
	results = require('../lib/results'),
	processCSS = require('../lib/process-css'),
	processJavaScript = require('../lib/process-javascript');

module.exports = {
	report: function(options) {
		var features = loadFeatures(),
			files = loadFiles(options.input),
			promises = [];

		promises.push(processCSS(features, files.css, results));
		promises.push(processJavaScript(features, files.javascript, results));

		return new Promise(function(resolve) {
			Promise.all(promises).then(function() {
				resolve(results.getResults());
			});
		});
	}
};
