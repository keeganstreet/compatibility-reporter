var compatibilityReporter = require('../lib/compatibility-reporter'),
	loadFeatures = require('../lib/load-features');

describe('Compatibility reporter', function() {
	var browsers = [
			'chrome 51',
			'firefox 47',
			'safari 9.1',
			'safari 8',
			'opera 38',
			'edge 13',
			'ie 11',
			'ie 10',
			'ie 9',
			'ie 8',
			'ie_mob 11',
			'ios_saf 9.3',
			'and_chr 51'
		],
		report;

	beforeAll(function(done) {
		compatibilityReporter.report({
			files: [
				// '/Users/kestreet/Projects/AusSuper/aussuper-onboarding-fed/build/prod/assets/css/style.css',
				// '/Users/kestreet/Projects/AusSuper/aussuper-onboarding-fed/source/assets/js/**/*.js',
				// '/Users/kestreet/Projects/AusSuper/aussuper-onboarding-fed/build/prod/**/*.html'
				'/Users/kestreet/Projects/Deloitte/Atom/atom-compatibility-reporter/**/*'
			],
			// ignore: ['**/plugins/**', '**/*.min.js'],
			ignore: ['**/node_modules/**'],
			browsers: browsers,
			output: 'test.html'
		}).then(function(result) {
			report = result;
			done();
		});
	});

	it('should return an object as output', function() {
		// console.log(JSON.stringify(report, '  '));
		expect(report).toEqual(jasmine.any(Object));
	});
});
