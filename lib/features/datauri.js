module.exports = {
	css: {
		value: [
			/^url\('data:/
		]
	},
	html: {
		attributeAndValue: [
			{
				attribute: [
					/^src$/
				],
				value: [
					/^data:/
				]
			}
		]
	}
};
