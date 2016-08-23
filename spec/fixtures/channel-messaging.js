var channel = new MessageChannel();
var para = document.querySelector('p');

var ifr = document.querySelector('iframe');
var otherWindow = ifr.contentWindow;

function iframeLoaded() {
	otherWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}

ifr.addEventListener('load', iframeLoaded, false);

function handleMessage(e) {
	para.innerHTML = e.data;
}

channel.port1.onmessage = handleMessage;
