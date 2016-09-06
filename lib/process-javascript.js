var espree = require('espree'),
	esrecurse = require('esrecurse');

module.exports = function(features, files, resultStore) {
	var checkNodePresenceAgainstFeatures,
		checkNodePropertyAgainstFeatures;

	// For features that can be identified by the presence of a type of node
	checkNodePresenceAgainstFeatures = function(type, node, file) {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName];

			if (feature.javascript && feature.javascript[type]) {
				if (type === node.type) {
					resultStore.addResult({
						feature: featureName,
						filename: file.filename,
						line: node.loc.start.line,
						column: node.loc.start.column,
						type: 'JavaScript ' + type,
						match: node.type
					});
				}
			}
		});
	};

	// For features that can be identified by the node property matching a pattern
	checkNodePropertyAgainstFeatures = function(type, node, property, file) {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName];
			if (feature.javascript && feature.javascript[type]) {
				feature.javascript[type].forEach(function(regex) {
					if (regex.test(node[property])) {
						resultStore.addResult({
							feature: featureName,
							filename: file.filename,
							line: node.loc.start.line,
							column: node.loc.start.column,
							type: 'JavaScript ' + type,
							match: node[property]
						});
					}
				});
			}
		});
	};

	files.forEach(function(file) {
		var ast = espree.parse(file.content, {
				loc: true,
				ecmaVersion: 6
			});

		esrecurse.visit(ast, {
			ArrowFunctionExpression: function(node) {
				checkNodePresenceAgainstFeatures('ArrowFunctionExpression', node, file);
			}
		});

		esrecurse.visit(ast, {
			Identifier: function(node) {
				checkNodePropertyAgainstFeatures('Identifier', node, 'name', file);
			},
			Literal: function(node) {
				checkNodePropertyAgainstFeatures('Literal', node, 'value', file);
			}
		});

		esrecurse.visit(ast, {
			VariableDeclaration: function(node) {
				checkNodePropertyAgainstFeatures('VariableDeclaration', node, 'kind', file);
			}
		});
	});

	return new Promise(function(resolve) {
		resolve();
	});
};
