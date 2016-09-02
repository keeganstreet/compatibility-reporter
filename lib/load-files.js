var fs = require('fs'),
	glob = require('glob'),
	Minimatch = require('minimatch').Minimatch;

module.exports = function(files, fileFilters, ignore) {
	var paths = [],
		results = {
			css: [],
			javascript: [],
			html: []
		},
		fileFiltersRegex;

	// Use default file filters if necessary
	if (!fileFilters) {
		fileFilters = {};
	}
	if (!fileFilters.css) {
		fileFilters.css = ['*.css'];
	}
	if (!fileFilters.javascript) {
		fileFilters.javascript = ['*.js'];
	}
	if (!fileFilters.html) {
		fileFilters.html = ['*.html', '*.htm', '*.shtml', '*.erb'];
	}

	// Convert file filters to Regular Expressions
	fileFiltersRegex = {
		css: fileFilters.css.map(function(css) {
			return new Minimatch(css, { matchBase: true, dot: true });
		}),
		javascript: fileFilters.javascript.map(function(javascript) {
			return new Minimatch(javascript, { matchBase: true, dot: true });
		}),
		html: fileFilters.html.map(function(html) {
			return new Minimatch(html, { matchBase: true, dot: true });
		})
	};

	// Create an array of all the paths
	files.forEach(function(pattern) {
		glob.sync(pattern, { ignore: ignore }).forEach(function(file) {
			paths.push(file);
		});
	});

	paths.forEach(function(path) {
		// Load CSS files
		fileFiltersRegex.css.forEach(function(css) {
			if (css.match(path)) {
				results.css.push({
					filename: path,
					content: fs.readFileSync(path, { encoding: 'utf8' })
				});
			}
		});

		// Load JavaScript files
		fileFiltersRegex.javascript.forEach(function(javascript) {
			if (javascript.match(path)) {
				results.javascript.push({
					filename: path,
					content: fs.readFileSync(path, { encoding: 'utf8' })
				});
			}
		});

		// Load HTML files
		fileFiltersRegex.html.forEach(function(html) {
			if (html.match(path)) {
				results.html.push({
					filename: path,
					content: fs.readFileSync(path, { encoding: 'utf8' })
				});
			}
		});
	});

	return results;
};
