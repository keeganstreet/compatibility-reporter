var compatibilityReporter = require('../lib/compatibility-reporter');

var result = compatibilityReporter.report({
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
	],
	features: [
		'arrow-functions',
		'css-gradients',
		'css-transitions',
		'css3-boxsizing',
		'history',
		'matchmedia',
		'promises',
		'svg',
		'webworkers'
	]
});

console.log(result);

describe('A suite', function() {
	it('contains spec with an expectation', function() {
		expect(true).toBe(true);
	});
});
