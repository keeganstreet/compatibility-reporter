var espree = require('espree'),
	esrecurse = require('esrecurse');

module.exports = function(features, files) {
	var results = {},
		checkNodeAgainstFeatures,
		addResult;

	addResult = function(featureName, feature, filename, node) {
		if (!results[featureName]) {
			results[featureName] = [];
		}

		results[featureName].push({
			file: filename,
			line: node.loc.start.line,
			column: node.loc.start.column
		});
	};

	checkNodeAgainstFeatures = function(type, node, file) {
		var featureName,
			feature;

		for (featureName in features) {
			if (features.hasOwnProperty(featureName)) {
				feature = features[featureName];

				if (feature.javascript && feature.javascript[type]) {
					if (feature.javascript[type] === true) {
						// This feature can be idenitified by the presence of a type of node
						if (type === node.type) {
							addResult(featureName, feature, file.filename, node);
						}
					} else {
						// This feature can be idenitified by the node name matching a pattern
						feature.javascript[type].forEach(function(regex) {
							if (regex.test(node.name)) {
								addResult(featureName, feature, file.filename, node);
							}
						});
					}
				}
			}
		}
	};

	files.forEach(function(file) {
		var ast = espree.parse(file.content, {
				loc: true,
				ecmaVersion: 6
			}),
			types = {};

		['ArrowFunctionExpression', 'Identifier', 'Literal'].forEach(function(type) {
			types[type] = function(node) {
				checkNodeAgainstFeatures(type, node, file);
			};
		});

		esrecurse.visit(ast, types);
	});

	return new Promise(function(resolve) {
		resolve(results);
	});
};
