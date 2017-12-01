function parseInput(){
	var text = document.getElementById("text").value;
	//var lines = text.split('\n');

	let total = 0;
	let total2 = 0;
	let length = text.length;
	let halfLength = length/2;

	text = text.split('').map(Number);

	for(var i = 0; i < length; i++) {
		if(text[i] === text[(i+1)%length]) {
			total += text[i];
		}
		if(text[i] === text[(i+halfLength)%length]) {
			total2 += text[i];
		}
	}

	document.getElementById("answer1").innerHTML = `Answer1: ${total}`;
	document.getElementById("answer2").innerHTML = `Answer2: ${total2}`;
}
