# Compatibility Reporter

Generate a report on the Web Platform features that your website uses, and the browser support of each feature, using data from [Can I Use](http://caniuse.com/).

Compatibility Reporter crawls through your CSS, JavaScript and HTML and builds up an Abstract Syntax Tree (AST) for each file. It then searches through the relevant parts of each file (such as declaration property names and values in CSS, identifier names in JavaScript, and element and attribute names in HTML), to identify which features are in use. It then extracts support data for each of these features from the Can I Use database for each browser you requested.

So far Compatibility Reporter checks for the following features: `'addeventlistener', 'arrow-functions', 'atob-btoa', 'autofocus', 'background-attachment', 'background-img-opts', 'background-position-x-y', 'calc', 'canvas', 'const', 'contenteditable', 'css-all', 'css-animation', 'css-gradients', 'css-transitions', 'css3-boxsizing', 'flexbox', 'history', 'let', 'matchmedia', 'promises', 'svg', 'viewport-units', 'webworkers'`. More to come. See [Adding checks for features](#adding-checks).

## Input

The `report` method accepts one object as a parameter. This object should have three properties: `input`, `browsers` and `output` (optional).

- `input.css.files` accepts a [Glob](https://github.com/isaacs/node-glob) pattern for the location of the CSS files you want to process.
- `input.javascript.files` accepts a Glob pattern for the location of the JavaScript files you want to process.
- `input.html.files` accepts a Glob pattern for the location of the CSS files you want to process.
- `browsers` accepts an array of browsers that you would like to be included in the report. For example `["chrome 52", "ie 11"]` will return results for Chrome 52 and IE 11. This array can be generated with [Browserslist](https://github.com/ai/browserslist), for example `browserslist('last 1 version, > 10%');` will return results for all browser versions that are the last version of each major browser, or have a usage of over 10% in global usage statistics.
- `output` (optional) accepts a file path where the HTML report should be exported.

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
  browsers: ['chrome 51', 'firefox 47', 'safari 9.1', 'edge 13', 'ie 11', 'ie 10'],
  output: 'compatibility-report.html'
}).then(function(result) {
  console.log(result);
});
```

This would generate a file called `compatibility-report.html` and log the following to the console:

![Screenshot of compatibility-report.html](/templates/screenshot-output-example.png?raw=true)

```js
{
  "addeventlistener": {
    "title": "EventTarget.addEventListener()",
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
    "title": "Arrow functions",
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

## <a name="adding-checks"></a>Adding checks for features

To add a check for a feature, add a JavaScript file in the `lib/features` folder with the same name as the Can I Use feature definition at https://github.com/Fyrd/caniuse/tree/master/features-json. Add a CSS, JavaScript and/or HTML fixture to the `spec/fixtures` folder to verify your check. If you would like to contribute, you can run `npm run status` to see a list of priority feature checks that need to be added.

### CSS

CSS checks should define regular expressions to match declaration properties and/or declaration values. See the `flexbox` test for an example where both the property and value must match for a result to be returned. You can also define checks for at-rules, such as `@keyframes`.

### JavaScript

JavaScript checks should define regular expressions to match identifiers, literals, or variable declarations as per the [ESTree specification](https://github.com/estree/estree). Or alternatively they can check for the existence of a node type, for example the Arrow Functions test will return true if the script has a node of type `ArrowFunctionExpression` - no regular expression matching is necessary.

### HTML

CSS checks should define regular expressions to match element names or attribute names.
