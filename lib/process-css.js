var postcss = require('postcss');

module.exports = function(features, files) {
	var processor = postcss(),
		promises = [],
		results = {},
		addResult;

	addResult = function(featureName, feature, filename, declaration) {
		if (!results[featureName]) {
			results[featureName] = [];
		}

		results[featureName].push({
			file: filename,
			line: declaration.source.start.line,
			column: declaration.source.start.column
		});
	};

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
											addResult(featureName, feature, file.filename, declaration);
										}
									});
								}

								// Check if the declaration uses any of this feature's values
								if (feature.css.value) {
									feature.css.value.forEach(function(regex) {
										if (regex.test(declaration.value)) {
											addResult(featureName, feature, file.filename, declaration);
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
			resolve(results);
		});
	});
};
