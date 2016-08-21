var loadFiles = require('../lib/load-files');

describe('File loading', function() {
	it('should load CSS, JavaScript and HTML files', function() {
		var results = loadFiles({
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
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toBeGreaterThan(1);
		expect(results.html.length).toBeGreaterThan(1);
	});

	it('should load CSS files on their own', function() {
		var results = loadFiles({
			css: {
				files: 'spec/fixtures/**/*.css'
			}
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toEqual(0);
		expect(results.html.length).toEqual(0);
	});
});
