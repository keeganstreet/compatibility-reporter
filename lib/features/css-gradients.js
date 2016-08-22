module.exports = {
	css: {
		propertyAndValue: [
			// Must match a property and a value from this object
			{
				property: [
					/^background$/,
					/^background\-image$/,
					/^border\-image$/,
					/^content$/,
					/^list\-style\-image$/,
					/^cursor$/
				],
				value: [
					/linear\-gradient/,
					/radial\-gradient/
				]
			}
		]
	}
};
