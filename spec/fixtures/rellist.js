var links = document.getElementsByTagName('link');
var length = links.length;
for (var i = 0; i < length; i++) {
	var list = links[i].relList;
	var listLength = list.length;
	console.log('New link found.');
	for (var j = 0; j < listLength; j++) {
		console.log(list[j]);
	}
}
