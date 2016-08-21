var espree = require('espree'),
	esrecurse = require('esrecurse');

module.exports = function(features, files, results) {
	var checkNodeAgainstFeatures;

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
							results.addResult(featureName, file.filename, node.loc.start.line, node.loc.start.column);
						}
					} else {
						// This feature can be idenitified by the node name matching a pattern
						feature.javascript[type].forEach(function(regex) {
							if (regex.test(node.name)) {
								results.addResult(featureName, file.filename, node.loc.start.line, node.loc.start.column);
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
		resolve();
	});
};
