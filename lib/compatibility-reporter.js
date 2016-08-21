var loadFeatures = require('./load-features'),
	loadFiles = require('../lib/load-files'),
	results = require('../lib/results'),
	processCSS = require('../lib/process-css'),
	processJavaScript = require('../lib/process-javascript'),
	processHtml = require('../lib/process-html'),
	caniuse = require('../lib/caniuse');

module.exports = {
	report: function(options) {
		var features = loadFeatures(),
			files = loadFiles(options.input),
			promises = [];

		// Find features in source code
		promises.push(processCSS(features, files.css, results));
		promises.push(processJavaScript(features, files.javascript, results));
		promises.push(processHtml(features, files.html, results));

		return new Promise(function(resolve) {
			Promise.all(promises).then(function() {
				var output = results.getResults();

				// Get compatibility data for each feature
				Object.keys(output).forEach(function(feature) {
					output[feature].browsers = caniuse(options.browsers, feature);
				});

				resolve(output);
			});
		});
	}
};
