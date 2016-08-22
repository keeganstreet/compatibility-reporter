function letTest() {
	let x = 1;
	if (true) {
		let x = 2;  // different variable
		console.log(x);  // 2
	}
	console.log(x);  // 1
}
