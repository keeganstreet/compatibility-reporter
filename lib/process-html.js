var parse5 = require('parse5');

module.exports = function(features, files, results) {
	var walkChildNodes = function(file, childNodes) {
		childNodes.forEach(function(node) {
			var featureName,
				feature;

			for (featureName in features) {
				if (features.hasOwnProperty(featureName)) {
					feature = features[featureName];
					if (feature.html) {

						// Check if the node element name matches any of this feature's elements
						if (feature.html.element && node.tagName) {
							feature.html.element.forEach(function(regex) {
								if (regex.test(node.tagName)) {
									results.addResult(featureName, file.filename, node.__location.line, node.__location.col);
								}
							});
						}

						// Check if the node attributes match any of this feature's attributes
						if (feature.html.attribute && node.attrs && node.attrs.length > 0) {
							node.attrs.forEach(function(attribute) {
								feature.html.attribute.forEach(function(regex) {
									if (regex.test(attribute.name)) {
										results.addResult(featureName, file.filename, node.__location.line, node.__location.col);
									}
								});
							});
						}
					}
				}
			}

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
