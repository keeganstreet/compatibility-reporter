var loadFiles = require('../lib/load-files');

describe('File loading', function() {
	it('should load CSS, JavaScript and HTML files', function() {
		var results = loadFiles(['spec/fixtures/**/*'], {
			css: ['*.css'],
			javascript: ['*.js'],
			html: ['*.html', '*.htm']
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toBeGreaterThan(1);
		expect(results.html.length).toBeGreaterThan(1);
	});

	it('should load CSS, JavaScript and HTML files with default filters', function() {
		var results = loadFiles(['spec/fixtures/**/*']);

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toBeGreaterThan(1);
		expect(results.html.length).toBeGreaterThan(1);
	});

	it('should load CSS, JavaScript and HTML files with part default filters', function() {
		var results = loadFiles(['spec/fixtures/**/*'], {
			css: ['*.css']
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toBeGreaterThan(1);
		expect(results.html.length).toBeGreaterThan(1);
	});

	it('should load CSS, JavaScript and HTML files with full paths instead of patterns', function() {
		var results = loadFiles([
			'spec/fixtures/calc.css',
			'spec/fixtures/addeventlistener.js',
			'spec/fixtures/arrow-functions.js',
			'spec/fixtures/autofocus.html',
			'spec/fixtures/canvas.html',
			'spec/fixtures/hidden.html'
		]);

		expect(results.css.length).toEqual(1);
		expect(results.javascript.length).toEqual(2);
		expect(results.html.length).toEqual(3);
	});

	it('should load CSS files on their own by setting JS and HTML filters to empty arrays', function() {
		var results = loadFiles(['spec/fixtures/**/*'], {
			css: ['*.css'],
			javascript: [],
			html: []
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toEqual(0);
		expect(results.html.length).toEqual(0);
	});

	it('should load CSS files on their own by applying a CSS filter to the files input', function() {
		var results = loadFiles(['spec/fixtures/**/*.css'], {
			css: ['*.css'],
			javascript: ['*.js'],
			html: ['*.html', '*.htm']
		});

		expect(results.css.length).toBeGreaterThan(1);
		expect(results.javascript.length).toEqual(0);
		expect(results.html.length).toEqual(0);
	});

	it('should respect the ignore parameter', function() {
		var results = loadFiles(['spec/fixtures/**/*'], null, ['**/*.css']);

		expect(results.css.length).toEqual(0);
		expect(results.javascript.length).toBeGreaterThan(1);
		expect(results.html.length).toBeGreaterThan(1);
	});

	it('should respect the ignore parameter with a folder', function() {
		var results = loadFiles(['spec/fixtures/**/*'], null, ['**/fixtures/**']);

		expect(results.css.length).toEqual(0);
		expect(results.javascript.length).toEqual(0);
		expect(results.html.length).toEqual(0);
	});
});
