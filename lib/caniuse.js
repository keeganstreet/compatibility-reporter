var fs = require('fs');

module.exports = function(browsers, feature) {
	var caniuse = require('caniuse-db/features-json/' + feature + '.json'),
		result = {
			title: caniuse.title,
			stats: {}
		};

	browsers.forEach(function(browser) {
		var browserArray = browser.split(' '),
			browserName = browserArray[0],
			browserVersion = browserArray[1];

		if (!result.stats[browserName]) {
			result.stats[browserName] = {};
		}
		result.stats[browserName][browserVersion] = caniuse.stats[browserName][browserVersion];
	});

	return result;
};
