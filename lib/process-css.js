var postcss = require('postcss');

module.exports = function(features, files, resultStore) {
	var processor = postcss(),
		promises = [];

	files.forEach(function(file) {
		promises.push(new Promise(function(resolve) {
			processor.process(file.content).then(function(postcssResult) {
				postcssResult.root.walkDecls(function(declaration) {
					Object.keys(features).forEach(function(featureName) {
						var feature = features[featureName];
						if (feature.css) {

							// Check if the declaration uses any of this feature's properties
							if (feature.css.property) {
								feature.css.property.forEach(function(regex) {
									if (regex.test(declaration.prop)) {
										resultStore.addResult({
											feature: featureName,
											filename: file.filename,
											line: declaration.source.start.line,
											column: declaration.source.start.column,
											type: 'CSS declaration property',
											match: declaration.prop
										});
									}
								});
							}

							// Check if the declaration uses any of this feature's values
							if (feature.css.value) {
								feature.css.value.forEach(function(regex) {
									if (regex.test(declaration.value)) {
										resultStore.addResult({
											feature: featureName,
											filename: file.filename,
											line: declaration.source.start.line,
											column: declaration.source.start.column,
											type: 'CSS declaration value',
											match: declaration.value
										});
									}
								});
							}

							// Check if the declaration matches a property / value pair
							if (feature.css.propertyAndValue) {
								feature.css.propertyAndValue.forEach(function(propertyAndValue) {
									var matchesProperty = false,
										matchesValue = false;

									propertyAndValue.property.forEach(function(regex) {
										if (regex.test(declaration.prop)) {
											matchesProperty = true;
										}
									});

									if (!matchesProperty) {
										return;
									}

									propertyAndValue.value.forEach(function(regex) {
										if (regex.test(declaration.value)) {
											matchesValue = true;
										}
									});

									if (matchesProperty && matchesValue) {
										resultStore.addResult({
											feature: featureName,
											filename: file.filename,
											line: declaration.source.start.line,
											column: declaration.source.start.column,
											type: 'CSS declaration property and value',
											match: declaration.prop + ': ' + declaration.value
										});
									}
								});
							}
						}
					});
				});

				postcssResult.root.walkAtRules(function(atrule) {
					Object.keys(features).forEach(function(featureName) {
						var feature = features[featureName];
						if (feature.css && feature.css.atrule) {
							feature.css.atrule.forEach(function(regex) {
								if (regex.test(atrule.name)) {
									resultStore.addResult({
										feature: featureName,
										filename: file.filename,
										line: atrule.source.start.line,
										column: atrule.source.start.column,
										type: 'CSS at-rule',
										match: atrule.name
									});
								}
							});
						}
					});
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
