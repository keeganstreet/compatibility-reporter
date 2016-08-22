module.exports = {
	css: {
		property: [
			/^background\-clip$/,
			/^background\-origin$/,
			/^background\-size$/
		],
		propertyAndValue: [
			// A background property with a comma separated value https://www.w3.org/TR/css3-background/#backgrounds
			// Should match this: `center center, 20% 80%, top left, bottom right`
			// Should match this: `url(flower.png), url(ball.png), url(grass.png)` (not matching this, to avoid false positives on following items)
			// Should not match this: `rgba(0,0,0,.05)`
			// Should not match this: `linear-gradient(-180deg,rgba(255,255,255,0) 0,#fff 90%)`\
			// /,(?!.+\))/g means match commas, but only if they are not followed by a closing bracket
			{
				property: [
					/^background/
				],
				value: [
					/,(?!.+\))/g
				]
			}
		]
	}
};
