var loadFeatures = require('./load-features'),
	loadFiles = require('../lib/load-files'),
	resultStore = require('../lib/result-store'),
	processCSS = require('../lib/process-css'),
	processJavaScript = require('../lib/process-javascript'),
	processHtml = require('../lib/process-html'),
	caniuse = require('../lib/caniuse'),
	outputHtml = require('../lib/output-html');

module.exports = {
	report: function(options) {
		var features = loadFeatures(),
			files = loadFiles(options.files, options.fileFilters, options.ignore),
			promises = [];

		// Find features in source code
		promises.push(processCSS(features, files.css, resultStore));
		promises.push(processJavaScript(features, files.javascript, resultStore));
		promises.push(processHtml(features, files.html, resultStore));

		return new Promise(function(resolve) {
			Promise.all(promises).then(function() {
				var results = resultStore.getResults();

				// Get compatibility data for each feature
				Object.keys(results).forEach(function(feature) {
					var caniuseData = caniuse(options.browsers, feature);
					results[feature].title = caniuseData.title;
					results[feature].stats = caniuseData.stats;
				});

				// Generate HTML output
				if (options.output) {
					outputHtml(options, results, files);
				}

				resolve(results);
			});
		});
	}
};
