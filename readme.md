# Compatibility reporter

Generate a report on the Web Platform features that your website uses, and the browser support of each feature, using data from [Can I Use](http://caniuse.com/).

## Input

The `report` method accepts one object as a parameter. This object should have two properties: `input` and `browsers`.

`input.css.files` accepts a [Glob](https://github.com/isaacs/node-glob) pattern for the location of the CSS files you want to process.
`input.javascript.files` accepts a Glob pattern for the location of the JavaScript files you want to process.
`input.html.files` accepts a Glob pattern for the location of the CSS files you want to process.
`browsers` accepts an array of browsers that you would like to be included in the report. For example `["chrome 52", "ie 11"]` will return results for Chrome 52 and IE 11. This array can be generated with [Browserslist](https://github.com/ai/browserslist), for example `browserslist('last 1 version, > 10%');` will return results for all browser versions that are the last version of each major browser, or have a usage of over 10% in global usage statistics.

## Example usage

```js
var compatibilityReporter = require('compatibility-reporter');

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
	browsers: ['chrome 51', 'firefox 47', 'safari 9.1', 'edge 13', 'ie 11', 'ie 10']
}).then(function(result) {
	console.log(result);
});
```

This would result in the following console log:

```js
{
  "addeventlistener": {
    "occurances": [{
      "file": "spec/fixtures/addeventlistener.js",
      "line": 13,
      "column": 3
    }],
    "browsers": {
      "chrome": { "51": "y" },
      "firefox": { "47": "y" },
      "safari": { "9.1": "y" },
      "edge": { "13": "y" },
      "ie": { "10": "y", "11": "y" }
    }
  },
  "arrow-functions": {
    "occurances": [{
      "file": "spec/fixtures/arrow-functions.js",
      "line": 3,
      "column": 8
    }, {
      "file": "spec/fixtures/arrow-functions.js",
      "line": 5,
      "column": 8
    }, {
      "file": "spec/fixtures/arrow-functions.js",
      "line": 6,
      "column": 9
    }],
    "browsers": {
      "chrome": { "51": "y" },
      "firefox": { "47": "y" },
      "safari": { "9.1": "n" },
      "edge": { "13": "y" },
      "ie": { "10": "n", "11": "n" }
    }
  },
  ...
}
```

Each browser version receives a string ID indicating the level of support for this feature:

- `y` - (Y)es, supported by default
- `a` - (A)lmost supported (aka Partial support)
- `n` - (N)o support, or disabled by default
- `p` - No support, but has (P)olyfill
- `u` - Support (u)nknown
- `x` - Requires prefi(x) to work
- `d` - (D)isabled by default (need to enable flag or something)
- `#n` - Where n is a number, starting with 1, corresponds to the notes on the caniuse.com page for this feature. For example: `"42":"y #1"` means version 42 is supported by default and see note 1.