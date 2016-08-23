var fs = require('fs'),
	loadFeatures = require('../lib/load-features');

var summarise = function() {
	var caniuse = JSON.parse(fs.readFileSync('node_modules/caniuse-db/data.json', { encoding: 'utf8' })),
		supportedFeatures = loadFeatures(),
		alreadyDone = [],
		otherCategory = [],
		unofficial = [],
		veryWidelySupported = [],
		widelySupported = [],
		bleedingEdge = [],
		remaining = [],
		printFeature = function(featureName) {
			var feature = caniuse.data[featureName];
			console.log(` - ${featureName} (${feature.title})`);
		};

	Object.keys(caniuse.data).forEach(function(featureName) {
		var feature = caniuse.data[featureName];
		if (supportedFeatures[featureName]) {
			alreadyDone.push(featureName);
		} else if (feature.categories.length === 1 && feature.categories[0] === 'Other') {
			otherCategory.push(featureName);
		} else if (feature.status === 'unoff') {
			unofficial.push(featureName);
		} else if (/[xd]/.test(feature.stats.firefox['48']) || /[x]/.test(feature.stats.chrome['52']) || /[x]/.test(feature.stats.edge['14'])) {
			bleedingEdge.push(featureName);
		} else if (/[ya]/.test(feature.stats.ie['8'])) {
			veryWidelySupported.push(featureName);
		} else if (/[ya]/.test(feature.stats.ie['10'])) {
			widelySupported.push(featureName);
		} else {
			remaining.push(featureName);
		}
	});

	console.log(`\nThese features are already implemented: (${alreadyDone.length})`);
	alreadyDone.forEach(printFeature);

	console.log(`\nThese features are a high priority for implementation: (${remaining.length})`);
	remaining.forEach(printFeature);

	console.log(`\nThese features are a medium priority because they are widely supported (IE10+) (${widelySupported.length})`);
	widelySupported.forEach(printFeature);

	console.log(`\nThese features are a medium-low priority because they are very widely supported (IE8+) (${veryWidelySupported.length})`);
	veryWidelySupported.forEach(printFeature);

	console.log(`\nThese features are a low priority because they are brand new and it should be quite obvious that they are not widely supported (prefixed or disabled in latest Firefox, Chrome or Edge) (${bleedingEdge.length})`);
	bleedingEdge.forEach(printFeature);

	console.log(`\nThese features are a very low priority because they are not standards (${unofficial.length})`);
	unofficial.forEach(printFeature);

	console.log(`\nThese features will not be implemented because they are serverside, file formats, etc: (${otherCategory.length})`);
	otherCategory.forEach(printFeature);
};

summarise();
