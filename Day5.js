fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data;
	let lines = text.split('\n').map(Number);
	lines = lines.splice(0, lines.length-1);
	let length = lines.length;

	let steps = 0, index = 0, offset = 0;

	let end = false;

	while (!end) {
		let origIndex = index;
		offset = lines[index];
		index += offset

		if(isNaN(index)) {
			console.log("NaN");
			break;
		}

		if (offset >= 3) {
			lines[origIndex]--;
		}
		else {
			lines[origIndex]++;
		}

		steps++;
		if(index >= length) {
			end = true;
		}
	}

	console.log(steps);
});
