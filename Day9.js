fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data;
	let chars = text.split('');
	chars = chars.splice(0, chars.length-1);

	for(var i = 0; i < chars.length; i++) {
		if(chars[i] === '!') {
			chars.splice(i, 2);
			i--;
		}
	}

	let charsSubset = new Array();
	let openGarbage = false;
	let length = chars.length;
	let garbageTot = 0;

	for (var i = 0; i < length; i++) {
		if (openGarbage && chars[i] === '>') {
			openGarbage = false;
		}
		else if (openGarbage || chars[i] === '<') {
			if(openGarbage) garbageTot++;
			openGarbage = true;
		}
		else charsSubset.push(chars[i]);
	}

	let count = 0;
	let level = 0;

	charsSubset.forEach(function(char) {
		if(char === '{') {
			level++;

		}
		if(char === '}') {
			count += level;
			level--;
		}
	});

	console.log("Answer 1: " + count);
	console.log("Answer 2: " + garbageTot);
});
