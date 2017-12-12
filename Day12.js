fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	data = data.replace(/,/g, '');
	data = data.replace(/<-> /g, '');

	let lines = data.split('\n');
	let matches = [];
	let discards = [];
	let groups = [];

	while(lines.length > 0) {
		let nums = new Set();
		let search = true;

		while(search) {
			matches = [];
			discards = [];
			lines.forEach(function(line) {
				let numbers = line.split(' ').map(Number);
				let match = false;
				if(nums.size === 0) nums.add(numbers[0]);

				for(var i = 0; i < numbers.length; i++) {
					if(nums.has(numbers[i])) {
						match = true;
						break;
					}
				}
				if(match) {
					matches.push(line);
					numbers.forEach(function(number) {
						nums.add(number);
					});
				}
				else discards.push(line);
			});
			if(matches.length === 0) search = false;
			lines = discards;
		}

		groups.push(nums);
	}

	console.log("Answer 1: " + groups[0].size);
	console.log("Answer 2: " + groups.length);
});
