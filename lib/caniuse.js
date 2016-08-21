var fs = require('fs');

module.exports = function(browsers, feature) {
	var caniuse = JSON.parse(fs.readFileSync('node_modules/caniuse-db/features-json/' + feature + '.json', { encoding: 'utf8' })),
		result = {};

	browsers.forEach(function(browser) {
		var browserArray = browser.split(' '),
			browserName = browserArray[0],
			browserVersion = browserArray[1];

		if (!result[browserName]) {
			result[browserName] = {};
		}
		result[browserName][browserVersion] = caniuse.stats[browserName][browserVersion];
	});

	return result;
};
