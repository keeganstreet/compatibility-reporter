var fs = require('fs'),
	handlebars = require('handlebars');

module.exports = function(options, results, files) {
	var caniuse = JSON.parse(fs.readFileSync('node_modules/caniuse-db/data.json', { encoding: 'utf8' })),
		template = handlebars.compile(fs.readFileSync('./templates/output.html', { encoding: 'utf8' })),
		html,
		supportStatusLabels = {
			y: 'Supported',
			a: 'Partial support',
			n: 'Not supported',
			p: 'Not supported, but has a polyfill',
			u: 'Support unknown',
			x: '(requires prefix to work)',
			d: '(disabled by default)'
		};

	handlebars.registerHelper('browserFeatureSupport', function(browser, feature) {
		var stats = feature.browsers[browser.browserId][browser.browserVersion];

		// Remove note numbers
		stats = stats.replace(/ ?\#[0-9]+/g, '');

		// Replace each character with the full-text label
		return stats.replace(/([a-z])/g, function(replacement) {
			return supportStatusLabels[replacement] || '';
		});
	});

	handlebars.registerHelper('browserFeatureSupportClassname', function(browser, feature) {
		var stats = feature.browsers[browser.browserId][browser.browserVersion];

		// Remove note numbers
		stats = stats.replace(/ ?\#[0-9]+/g, '');

		// Prepend each status character with "support-status-"
		return stats.replace(/([a-z])/g, 'support-status-$1');
	});

	html = template({
		browsers: options.browsers.map(function(browser) {
			var browserArray = browser.split(' ');
			return {
				browser: browser,
				browserId: browserArray[0],
				browserName: caniuse.agents[browserArray[0]].browser,
				browserVersion: browserArray[1]
			};
		}),
		results: results,
		files: files
	});

	fs.writeFileSync(options.output, html, { encoding: 'utf8' });
};
