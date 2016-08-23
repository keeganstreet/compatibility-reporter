window.addEventListener('unload', function() {
	navigator.sendBeacon('/log', { analyticsData: 1234 });
}, false);
