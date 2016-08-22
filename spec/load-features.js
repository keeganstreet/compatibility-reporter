var loadFeatures = require('../lib/load-features'),
	fs = require('fs');

describe('Features loading', function() {
	var features;

	it('should load features', function() {
		features = loadFeatures();
		expect(features).toEqual(jasmine.any(Object));
		expect(features['arrow-functions']).toEqual(jasmine.any(Object));
		expect(features['css-gradients']).toEqual(jasmine.any(Object));
	});

	it('properties on features should be booleans or arrays', function() {
		Object.keys(features).forEach(function(featureName) {
			var feature = features[featureName],
				testName,
				test;

			if (feature.hasOwnProperty('css')) {
				expect(feature.css).toEqual(jasmine.any(Object));
				for (testName in feature.css) {
					if (feature.css.hasOwnProperty(testName)) {
						test = feature.css[testName];
						expect(Array.isArray(test)).toBe(true);
					}
				}
			}

			if (feature.hasOwnProperty('javascript')) {
				expect(feature.javascript).toEqual(jasmine.any(Object));
				for (testName in feature.javascript) {
					if (feature.javascript.hasOwnProperty(testName)) {
						test = feature.javascript[testName];
						expect(Array.isArray(test) || typeof test === 'boolean').toBe(true);
						if (Array.isArray(test)) {
							test.forEach(function(regexp) {
								expect(regexp.constructor === RegExp).toBe(true);
							});
						}
					}
				}
			}

			if (feature.hasOwnProperty('html')) {
				expect(feature.html).toEqual(jasmine.any(Object));
				for (testName in feature.html) {
					if (feature.html.hasOwnProperty(testName)) {
						test = feature.html[testName];
						expect(Array.isArray(test)).toBe(true);
						test.forEach(function(regexp) {
							expect(regexp.constructor === RegExp).toBe(true);
						});
					}
				}
			}
		});
	});

	it('there should be caniuse data for each feature', function() {
		var featureName,
			data;

		for (featureName in features) {
			if (features.hasOwnProperty(featureName)) {
				data = fs.readFileSync('node_modules/caniuse-db/features-json/' + featureName + '.json', { encoding: 'utf8' });
				expect(data).toEqual(jasmine.any(String));
				expect(data.substr(0, 1)).toEqual('{');
			}
		}
	});
});
