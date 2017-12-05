fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data
	let lines = text.split('\n').map(Number);
	let length = lines.length;
	lines = lines.splice(0, length-1);
	let steps = 0;
	let index = 0;

	let end = false;

	while (!end) {
		let origIndex = index;
		index += lines[index];
		lines[origIndex]++;
		if(isNaN(index)) break;
		steps++;
		if(index >= length) {
			end = true;
		}
	}

	console.log(steps);
});
