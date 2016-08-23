if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
	document.getElementById('dmEvent').innerHTML = 'Not supported.';
}
