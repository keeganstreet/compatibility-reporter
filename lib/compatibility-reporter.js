var loadFeatures = require('./load-features'),
	loadFiles = require('../lib/load-files'),
	processCSS = require('../lib/process-css');

module.exports = {
	report: function(options) {
		var features = loadFeatures(),
			files = loadFiles(options.input),
			promises = [];

		promises.push(processCSS(features, files.css));

		return new Promise(function(resolve) {
			Promise.all(promises).then(function(results) {
				var output = {};

				results.forEach(function(result) {
					var feature,
						occurances;

					for (feature in result) {
						if (result.hasOwnProperty(feature)) {
							occurances = result[feature];

							if (!output.hasOwnProperty(feature)) {
								output[feature] = {
									occurances: occurances
								};
							} else {
								output[feature].occurances = output[feature].occurances.concat(occurances);
							}
						}
					}
				});

				resolve(output);
			});
		});
	}
};
