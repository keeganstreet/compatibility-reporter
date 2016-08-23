// select the target node
var target = document.getElementById('some-id');

// create an observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		console.log(mutation.type);
	});
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);

// later, you can stop observing
observer.disconnect();
