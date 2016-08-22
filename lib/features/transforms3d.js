module.exports = {
	css: {
		property: [
			/^perspective$/,
			/^perspective\-origin$/,
			/^backface\-visibility$/
		],
		propertyAndValue: [
			// Must match a property and a value from this object
			{
				property: [
					/^transform/
				],
				value: [
					/translateZ/,
					/scaleZ/,
					/skewZ/,
					/rotateZ/,
					/matrix3d/,
					/translate3d/,
					/scale3d/,
					/rotate3d/,
					/preserve\-3d/,
					/perspective/
				]
			}
		]
	}
};
