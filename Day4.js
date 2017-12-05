fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data
	let lines = text.split('\n');
	let length = lines.length;

	let total = 0, total2 = 0;

	for(var i = 0; i < length; i++) {
		let words = lines[i].split(' ').filter(function(x) { return x});
		let set = new Set(words);
		let set2 = new Set();
		let anagram = false;

		if(words.length > 0 ) {
			if(words.length === set.size) total ++;

			words.forEach(function(word) {
				word = word.split('').sort().join('');
				
				if (!set2.has(word)) set2.add(word);
				else {
					anagram = true;
					return;
				}
			});

			if (!anagram) total2++;
		}
	}

	console.log(`Answer1: ${total}`);
	console.log(`Answer2: ${total2}`);
});
