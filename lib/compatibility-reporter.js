var loadFeatures = require('./load-features');

module.exports = {
	report: function() {
		var features = loadFeatures();
		console.log(features);
	}
};
