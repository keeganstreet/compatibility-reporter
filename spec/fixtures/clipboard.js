document.addEventListener('copy', function(e){
	e.clipboardData.setData('text/plain', 'Hello, world!');
	e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
	e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
});
