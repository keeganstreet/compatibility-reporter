var espree = require('espree'),
	esrecurse = require('esrecurse');

module.exports = function(features, files, results) {
	var checkNodeAgainstFeatures;

	checkNodeAgainstFeatures = function(type, node, file) {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName];

			if (feature.javascript && feature.javascript[type]) {
				if (feature.javascript[type] === true) {
					// This feature can be identified by the presence of a type of node
					if (type === node.type) {
						results.addResult({
							feature: featureName,
							filename: file.filename,
							line: node.loc.start.line,
							column: node.loc.start.column,
							type: 'JavaScript ' + type,
							match: node.type
						});
					}
				} else {
					// This feature can be identified by the node name matching a pattern
					feature.javascript[type].forEach(function(regex) {
						if (regex.test(node.name)) {
							results.addResult({
								feature: featureName,
								filename: file.filename,
								line: node.loc.start.line,
								column: node.loc.start.column,
								type: 'JavaScript ' + type,
								match: node.name
							});
						}
					});
				}
			}
		});
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
