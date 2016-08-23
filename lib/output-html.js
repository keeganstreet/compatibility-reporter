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
		},
		sortedResults = [];

	// Sort features alphabetically
	Object.keys(results).forEach(function(result) {
		sortedResults.push({
			id: result,
			value: results[result]
		});
	});
	sortedResults = sortedResults.sort(function(a, b) {
		var titleA = a.value.title.toUpperCase(),
			titleB = b.value.title.toUpperCase();

		if (titleA < titleB) {
			return -1;
		} else if (titleA > titleB) {
			return 1;
		} else {
			return 0;
		}
	});

	handlebars.registerHelper('browserFeatureSupport', function(browser, feature) {
		var status = feature.stats[browser.browserId][browser.browserVersion];

		// Remove note numbers
		status = status.replace(/ ?\#[0-9]+/g, '');

		// Replace each character with the full-text label
		return status.replace(/([a-z])/g, function(replacement) {
			return supportStatusLabels[replacement] || '';
		});
	});

	handlebars.registerHelper('browserFeatureSupportClassname', function(browser, feature) {
		var status = feature.stats[browser.browserId][browser.browserVersion];

		// Remove note numbers
		status = status.replace(/ ?\#[0-9]+/g, '');

		// Prepend each status character with "support-status-"
		return status.replace(/([a-z])/g, 'support-status-$1');
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
		results: sortedResults,
		files: files
	});

	fs.writeFileSync(options.output, html, { encoding: 'utf8' });
};
