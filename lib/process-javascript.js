var espree = require('espree'),
	esrecurse = require('esrecurse');

module.exports = function(features, files, resultStore) {
	var checkNodePresenceAgainstFeatures,
		checkNodeNameAgainstFeatures,
		checkNodeKindAgainstFeatures;

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

	// For features that can be identified by the node name matching a pattern
	checkNodeNameAgainstFeatures = function(type, node, file) {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName];
			if (feature.javascript && feature.javascript[type]) {
				feature.javascript[type].forEach(function(regex) {
					if (regex.test(node.name)) {
						resultStore.addResult({
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
		});
	};

	// For features that can be identified by the node kind matching a pattern
	checkNodeKindAgainstFeatures = function(type, node, file) {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName];
			if (feature.javascript && feature.javascript[type]) {
				feature.javascript[type].forEach(function(regex) {
					if (regex.test(node.kind)) {
						resultStore.addResult({
							feature: featureName,
							filename: file.filename,
							line: node.loc.start.line,
							column: node.loc.start.column,
							type: 'JavaScript ' + type,
							match: node.kind
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
				checkNodeNameAgainstFeatures('Identifier', node, file);
			},
			Literal: function(node) {
				checkNodeNameAgainstFeatures('Literal', node, file);
			}
		});

		esrecurse.visit(ast, {
			VariableDeclaration: function(node) {
				checkNodeKindAgainstFeatures('VariableDeclaration', node, file);
			}
		});
	});

	return new Promise(function(resolve) {
		resolve();
	});
};
