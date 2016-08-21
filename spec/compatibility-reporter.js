var compatibilityReporter = require('../lib/compatibility-reporter'),
	loadFeatures = require('../lib/load-features');

describe('Compatibility reporter', function() {
	var browsers = [
			'chrome 51',
			'firefox 47',
			'safari 9.1',
			'opera 38',
			'edge 13',
			'ie 11',
			'ie 10',
			'ie_mob 11',
			'ios_saf 9.3',
			'and_chr 51'
		],
		report;

	beforeAll(function(done) {
		compatibilityReporter.report({
			input: {
				css: {
					files: 'spec/fixtures/**/*.css'
				},
				javascript: {
					files: 'spec/fixtures/**/*.js',
					ignore: 'spec/fixtures/lib/*.js'
				},
				html: {
					files: 'spec/fixtures/**/*.html'
				}
			},
			browsers: browsers
		}).then(function(result) {
			report = result;
			done();
		});
	});

	it('should return an object as output', function() {
		// console.log(JSON.stringify(report, '  '));
		expect(report).toEqual(jasmine.any(Object));
	});

	Object.keys(loadFeatures()).forEach(function(feature) {
		it('should find the use of ' + feature, function() {
			expect(report[feature]).toEqual(jasmine.any(Object));
		});

		it('should report on the location of ' + feature, function() {
			expect(Array.isArray(report[feature].occurances)).toBe(true);
		});

		it('should return browser support data for ' + feature, function() {
			expect(report[feature].browsers).toEqual(jasmine.any(Object));
		});

		browsers.forEach(function(browser) {
			var browserArray = browser.split(' '),
				browserName = browserArray[0],
				browserVersion = browserArray[1];

			it('should return browser support data for ' + feature + ' on ' + browser, function() {
				expect(report[feature].browsers[browserName][browserVersion]).toEqual(jasmine.any(String));
			});
		});
	});
});
