module.exports = {
	css: {
		property: [
			/^background\-clip$/,
			/^background\-origin$/,
			/^background\-size$/
		],
		propertyAndValue: [
			// A background property with a comma separated value https://www.w3.org/TR/css3-background/#backgrounds
			{
				property: [
					/^background/
				],
				value: [
					/,/
				]
			}
		]
	}
};
