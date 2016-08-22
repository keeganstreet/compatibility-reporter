var fs = require('fs');

module.exports = function(browsers, feature) {
	var caniuse = JSON.parse(fs.readFileSync('node_modules/caniuse-db/features-json/' + feature + '.json', { encoding: 'utf8' })),
		result = {
			title: caniuse.title,
			browsers: {}
		};

	browsers.forEach(function(browser) {
		var browserArray = browser.split(' '),
			browserName = browserArray[0],
			browserVersion = browserArray[1];

		if (!result.browsers[browserName]) {
			result.browsers[browserName] = {};
		}
		result.browsers[browserName][browserVersion] = caniuse.stats[browserName][browserVersion];
	});

	return result;
};
