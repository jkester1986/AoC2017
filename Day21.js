fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let directions = data.split('\n'),
		twoByTwo = {},
		threeByThree = {},
		count = 0,
		grid = [['.','.','#'], ['#','.','#'], ['.','#','#']];

	directions.forEach(function(dir) {
		let match = dir.match(/^(.+)\s\=>\s(.+)$/);
		if(count < 6) {
			twoByTwo[`${match[1]}`] = match[2];
		}
		else threeByThree[`${match[1]}`] = match[2];
		count++;
	})

	console.log(twoByTwo);
	console.log(threeByThree);

	for(var y = 0; y < grid.length; y++) {
		let string = '';
		for(var x = 0; x < grid[0].length; x++) {
			string += grid[x][y];
		}
		console.log(string);
	}

});
