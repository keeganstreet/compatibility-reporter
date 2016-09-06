var inputElement = document.getElementById('input');
inputElement.addEventListener('change', handleFiles, false);
function handleFiles() {
	var fileList = this.files; /* now you can work with the file list */
}
