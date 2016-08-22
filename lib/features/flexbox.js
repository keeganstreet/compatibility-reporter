module.exports = {
	css: {
		propertyAndValue: [
			// A background property with a comma separated value https://www.w3.org/TR/css3-background/#backgrounds
			{
				property: [
					/^display$/
				],
				value: [
					/^flex$/,
					/^inline-flex$/
				]
			}
		]
	}
};
