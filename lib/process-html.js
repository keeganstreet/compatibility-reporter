var parse5 = require('parse5');

module.exports = function(features, files, results) {
	var walkChildNodes = function(file, childNodes) {
		childNodes.forEach(function(node) {
			Object.keys(features).forEach(function(featureName) {
				var feature = features[featureName];
				if (feature.html) {

					// Check if the node element name matches any of this feature's elements
					if (feature.html.element && node.tagName) {
						feature.html.element.forEach(function(regex) {
							if (regex.test(node.tagName)) {
								results.addResult({
									feature: featureName,
									filename: file.filename,
									line: node.__location.line,
									column: node.__location.col,
									type: 'HTML element name',
									match: node.tagName
								});
							}
						});
					}

					// Check if the node attributes match any of this feature's attributes
					if (feature.html.attribute && node.attrs && node.attrs.length > 0) {
						node.attrs.forEach(function(attribute) {
							feature.html.attribute.forEach(function(regex) {
								if (regex.test(attribute.name)) {
									results.addResult({
										feature: featureName,
										filename: file.filename,
										line: node.__location.line,
										column: node.__location.col,
										type: 'HTML attribute name',
										match: attribute.name
									});
								}
							});
						});
					}
				}
			});

			if (node.childNodes) {
				walkChildNodes(file, node.childNodes);
			}
		});
	};

	files.forEach(function(file) {
		var document = parse5.parse(file.content, {
			locationInfo: true
		});
		walkChildNodes(file, document.childNodes);
	});

	return new Promise(function(resolve) {
		resolve();
	});
};
