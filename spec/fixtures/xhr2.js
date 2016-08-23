var formElement = document.querySelector('form');
var request = new XMLHttpRequest();
request.open('POST', 'submitform.php');
request.send(new FormData(formElement));
