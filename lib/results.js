var results = {};

module.exports = {
	addResult: function(featureName, filename, line, column) {
		if (!results[featureName]) {
			results[featureName] = {
				occurances: []
			};
		}

		results[featureName].occurances.push({
			file: filename,
			line: line,
			column: column
		});
	},
	getResults: function() {
		return results;
	}
};
