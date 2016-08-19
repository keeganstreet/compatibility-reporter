module.exports = {
	css: {
		property: [
			/^fill[\-]?/,
			/^stroke[\-]?/
		]
	},
	html: {
		element: [
			/^svg$/
		]
	},
	javascript: {
		Identifier: [
			/^SVG/
		]
	}
};
