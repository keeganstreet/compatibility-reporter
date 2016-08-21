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
			p: 'Not supported, but has a Polyfill',
			u: 'Support unknown',
			x: 'Requires prefix to work',
			d: 'Disabled by default'
		};

	handlebars.registerHelper('browserFeatureSupport', function(browser, feature) {
		return supportStatusLabels[feature.browsers[browser.browserId][browser.browserVersion][0]] || '';
	});

	handlebars.registerHelper('browserFeatureSupportClassname', function(browser, feature) {
		return 'support-status-' + feature.browsers[browser.browserId][browser.browserVersion][0];
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
