var postcss = require('postcss');

module.exports = function(features, files, results) {
	var processor = postcss(),
		promises = [];

	files.forEach(function(file) {
		promises.push(new Promise(function(resolve) {
			processor.process(file.content).then(function(postcssResult) {
				postcssResult.root.walkDecls(function(declaration) {
					var featureName,
						feature;

					for (featureName in features) {
						if (features.hasOwnProperty(featureName)) {
							feature = features[featureName];
							if (feature.css) {

								// Check if the declaration uses any of this feature's properties
								if (feature.css.property) {
									feature.css.property.forEach(function(regex) {
										if (regex.test(declaration.prop)) {
											results.addResult(featureName, file.filename, declaration.source.start.line, declaration.source.start.column);
										}
									});
								}

								// Check if the declaration uses any of this feature's values
								if (feature.css.value) {
									feature.css.value.forEach(function(regex) {
										if (regex.test(declaration.value)) {
											results.addResult(featureName, file.filename, declaration.source.start.line, declaration.source.start.column);
										}
									});
								}
							}
						}
					}
				});
				resolve();
			});
		}));
	});

	return new Promise(function(resolve) {
		Promise.all(promises).then(function() {
			resolve();
		});
	});
};
