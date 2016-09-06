var db;
function openDB() {
	var DBOpenRequest = window.indexedDB.open('toDoList');
	DBOpenRequest.onsuccess = function(e) {
		db = DBOpenRequest.result;
	}
}
