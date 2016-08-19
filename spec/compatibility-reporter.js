var compatibilityReporter = require('../lib/compatibility-reporter');

describe('Compatibility reporter', function() {
	var report;

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
			browsers: [
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
			]
		}).then(function(result) {
			report = result;
			done();
		});
	});

	it('should return an object as output', function() {
		expect(report).toEqual(jasmine.any(Object));
	});

	['css-gradients', 'css-transitions', 'css3-boxsizing', 'svg'].forEach(function(feature) {
		it('should find the use of ' + feature, function() {
			expect(report[feature]).toEqual(jasmine.any(Object));
			expect(Array.isArray(report[feature].occurances)).toBe(true);
		});
	});
});
