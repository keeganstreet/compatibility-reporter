/*

Generate a report on the Web Platform features that your website uses, and the browser support of each feature.

Output can be returned as TXT, JSON or HTML.

AST Explorer with examples
http://astexplorer.net/

PostCSS builds an AST for CSS
http://api.postcss.org/postcss.html

AST generator for JS
https://github.com/eslint/espree
https://github.com/estree/estree/blob/master/spec.md
https://github.com/estree/estree/blob/master/es6.md

AST generator for html
https://github.com/inikulin/parse5

*/

// Options for app
// input The files to process. Filenames matched with https://github.com/isaacs/node-glob
// browsers The browsers to include in the report. Can be generated with https://github.com/ai/browserslist
// features The features to check for
var options = {
	input: {
		css: {
			files: 'build/assets/css/*.css'
		},
		javascript: {
			files: 'source/assets/js/**/*.js',
			ignore: 'source/assets/js/lib/**/*.js'
		},
		html: {
			files: 'build/**/*.html'
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
};

// Example JSON output

var results = [
	{
		name: 'arrow-functions',
		browsers: {
			'chrome 51': 'y',
			'firefox 47': 'y',
			'safari 9.1': 'y',
			'opera 38': 'y',
			'edge 13': 'y',
			'ie 11': 'n',
			'ie 10': 'n',
			'ie_mob 11': 'n',
			'ios_saf 9.3': 'n',
			'and_chr 51': 'y'
		},
		occurances: [
			{
				file: 'script.js',
				line: 18,
				column: 15
			},
			{
				file: 'script.js',
				line: 22,
				column: 12
			}
		]
	}
];
