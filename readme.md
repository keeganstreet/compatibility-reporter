# Compatibility Reporter

Generate a report on the Web Platform features that your website uses, and the browser support of each feature, using data from [Can I Use](http://caniuse.com/).

Compatibility Reporter crawls through your CSS, JavaScript and HTML and builds up an Abstract Syntax Tree (AST) for each file. It then searches through the relevant parts of each file (such as declaration property names and values in CSS, identifier names in JavaScript, and element and attribute names in HTML), to identify which features are in use. It then extracts support data for each of these features from the Can I Use database for each browser you requested.


## Input

The `report` method accepts one object as a parameter. It will look for the following properties on this object:

| Property                 | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|:-------------------------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `files`                  | Required | Array of [Glob](https://github.com/isaacs/node-glob) patterns or file paths for the files or directories you want to process.                                                                                                                                                                                                                                                                                                                         |
| `browsers`               | Required | Array of browsers that you would like to be included in the report. For example `['chrome 52', 'ie 11']` will return results for Chrome 52 and IE 11. This array can be generated with [Browserslist](https://github.com/ai/browserslist), for example `browserslist('last 1 version, > 10%');` will return results for all browser versions that are the last version of each major browser, or have a usage of over 10% in global usage statistics. |
| `ignore`                 | Optional | Array of [Glob](https://github.com/isaacs/node-glob) patterns to exclude matches. For example, `['**/node_modules/**', '**/*.min.js']`.                                                                                                                                                                                                                                                                                                               |
| `output`                 | Optional | File path where the HTML report should be exported.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `fileFilters`            | Optional | Object with `css`, `javascript` and `html` properties, as defined below.                                                                                                                                                                                                                                                                                                                                                                              |
| `fileFilters.css`        | Optional | Array of [Minimatch](https://github.com/isaacs/minimatch) patterns to define which files should be parsed as CSS. Defaults to `['*.css']`.                                                                                                                                                                                                                                                                                                            |
| `fileFilters.javascript` | Optional | Array of [Minimatch](https://github.com/isaacs/minimatch) patterns to define which files should be parsed as JavaScript. Defaults to `['*.js']`.                                                                                                                                                                                                                                                                                                      |
| `fileFilters.html`       | Optional | Array of [Minimatch](https://github.com/isaacs/minimatch) patterns to define which files should be parsed as HTML. Defaults to `['*.html', '*.htm', '*.shtml', '*.erb']`.                                                                                                                                                                                                                                                                             |


## Example usage

```js
var compatibilityReporter = require('compatibility-reporter');

compatibilityReporter.report({
  files: ['spec/fixtures/**/*'],
  browsers: ['chrome 51', 'firefox 47', 'safari 9.1', 'edge 13', 'ie 11', 'ie 10'],
  output: 'compatibility-report.html'
}).then(function(result) {
  console.log(result);
});
```

This would generate a file called `compatibility-report.html`:

![Screenshot of compatibility-report.html](/templates/screenshot-output-example.png?raw=true)

And it would log the following to the console:

```js
{
  "addeventlistener": {
    "title": "EventTarget.addEventListener()",
    "occurances": [{
      "file": "spec/fixtures/addeventlistener.js",
      "line": 13,
      "column": 3
    }],
    "stats": {
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
    "stats": {
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

| ID   | Description                                                                                                                                                                                  |
|:-----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `y`  | (Y)es, supported by default                                                                                                                                                                  |
| `a`  | (A)lmost supported (aka Partial support)                                                                                                                                                     |
| `n`  | (N)o support, or disabled by default                                                                                                                                                         |
| `p`  | No support, but has (P)olyfill                                                                                                                                                               |
| `u`  | Support (u)nknown                                                                                                                                                                            |
| `x`  | Requires prefi(x) to work                                                                                                                                                                    |
| `d`  | (D)isabled by default (need to enable flag or something)                                                                                                                                     |
| `#n` | Where n is a number, starting with 1, corresponds to the notes on the caniuse.com page for this feature. For example: `"42":"y #1"` means version 42 is supported by default and see note 1. |


## Support for features

So far Compatibility Reporter checks for the following features:

- contenteditable (contenteditable attribute (basic support))
- webworkers (Web Workers)
- border-image (CSS3 Border images)
- background-img-opts (CSS3 Background-image options)
- css-gencontent (CSS Generated content for pseudo-elements)
- beacon (Beacon API)
- css3-boxsizing (CSS3 Box-sizing)
- transforms2d (CSS3 2D Transforms)
- devicepixelratio (Window.devicePixelRatio)
- transforms3d (CSS3 3D Transforms)
- sharedworkers (Shared Web Workers)
- css-transitions (CSS3 Transitions)
- css-animation (CSS Animation)
- css-gradients (CSS Gradients)
- svg (SVG (basic support))
- canvas (Canvas (basic support))
- indexeddb (IndexedDB)
- x-doc-messaging (Cross-document messaging)
- datauri (Data URIs)
- mathml (MathML)
- flexbox (Flexible Box Layout Module)
- fileapi (File API)
- websockets (Web Sockets)
- hidden (hidden attribute)
- calc (calc() as CSS unit value)
- history (Session history management)
- wordwrap (CSS3 Overflow-wrap)
- xhr2 (XMLHttpRequest advanced features)
- notifications (Web Notifications)
- dataset (dataset & data-* attributes)
- touch (Touch events)
- rellist (relList (DOMTokenList))
- deviceorientation (DeviceOrientation & DeviceMotion events)
- matchmedia (matchMedia)
- getcomputedstyle (getComputedStyle)
- word-break (CSS3 word-break)
- viewport-units (Viewport units: vw, vh, vmin, vmax)
- channel-messaging (Channel messaging)
- mutationobserver (Mutation Observer)
- clipboard (Clipboard API)
- promises (Promises)
- serviceworkers (Service Workers)
- srcset (Srcset attribute)
- will-change (CSS will-change property)
- domcontentloaded (DOMContentLoaded)
- picture (Picture element)
- imports (HTML Imports)
- atob-btoa (Base64 encoding and decoding)
- autofocus (Autofocus attribute)
- background-attachment (CSS background-attachment)
- meter (meter element)
- css-filter-function (CSS filter() function)
- const (const)
- css-all (CSS all property)
- let (let)
- arrow-functions (Arrow functions)
- addeventlistener (EventTarget.addEventListener())
- proxy (Proxy object)
- background-position-x-y (background-position-x & background-position-y)
- scrollintoview (scrollIntoView)

This is only a small subset of the features available on Can I Use. Adding more feature checks is a work in progress. See [Adding checks for features](#adding-checks).


## <a name="adding-checks"></a>Adding checks for features

To add a check for a feature, add a JavaScript file in the `lib/features` folder with the same name as the Can I Use feature definition at https://github.com/Fyrd/caniuse/tree/master/features-json. Add a CSS, JavaScript and/or HTML fixture to the `spec/fixtures` folder to verify your check. If you would like to contribute, you can run `npm run status` to see a list of priority feature checks that need to be added.

### CSS

CSS checks should define regular expressions to match declaration properties and/or declaration values. See the `flexbox` test for an example where both the property and value must match for a result to be returned. You can also define checks for at-rules, such as `@keyframes`.

### JavaScript

JavaScript checks should define regular expressions to match identifier names, literal values, or variable declarations as per the [ESTree specification](https://github.com/estree/estree). Or alternatively they can check for the existence of a node type, for example the Arrow Functions test will return true if the script has a node of type `ArrowFunctionExpression` - no regular expression matching is necessary.

### HTML

CSS checks should define regular expressions to match element names, attribute names or attribute values. See the `imports` test for an example of where both attribute name and attribute value must match for a result to be returned.
