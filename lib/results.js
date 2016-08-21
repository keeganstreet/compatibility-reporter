var results = {};

module.exports = {
	addResult: function(options) {
		var feature = options.feature,
			filename = options.filename,
			line = options.line,
			column = options.column,
			type = options.type,
			match = options.match;

		if (!results[feature]) {
			results[feature] = {
				occurances: []
			};
		}

		results[feature].occurances.push({
			file: filename,
			line: line,
			column: column
		});

		console.log(`"${filename}" ${line}:${column} ${feature} (${type}: ${match})`);
	},
	getResults: function() {
		return results;
	}
};
