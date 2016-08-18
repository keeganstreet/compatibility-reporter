var fs = require('fs'),
	glob = require('glob');

module.exports = function(input) {
	var results = {
			css: [],
			javascript: [],
			html: []
		};

	// Load CSS
	glob.sync(input.css.files, { ignore: input.css.ignore }).forEach(function(file) {
		results.css.push({
			filename: file,
			content: fs.readFileSync(file, { encoding: 'utf8' })
		});
	});

	// Load JavaScript
	glob.sync(input.javascript.files, { ignore: input.javascript.ignore }).forEach(function(file) {
		results.javascript.push({
			filename: file,
			content: fs.readFileSync(file, { encoding: 'utf8' })
		});
	});

	// Load HTML
	glob.sync(input.html.files, { ignore: input.html.ignore }).forEach(function(file) {
		results.html.push({
			filename: file,
			content: fs.readFileSync(file, { encoding: 'utf8' })
		});
	});

	return results;
};
