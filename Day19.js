fs = require('fs');
fs.readFile('Day19.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	//data = data.trim();
	let lines = data.split('\n');
	let length = lines.length;
	let grid = [];

	for(let i = 0; i < length; i++) {
		grid.push(new Array(length));
	}

	for (let y = 0; y < length; y++) {
		let line = lines[y];
		for(let x = 0; x < length; x++) {
			grid[x][y] = line.charAt(x);
		}
	}

	let pos = {
		x: lines[0].indexOf('|'),
		y: 0
	}

	let dir = 'up';
	let letters = '';
	let inMaze = true;
	let count = 1;

	while(inMaze) {
		count++;
		switch(dir) {
			case 'up':
				pos.y++;
				break;
			case 'down':
				pos.y--;
				break;
			case 'left':
				pos.x--;
				break;
			case 'right':
				pos.x++;
				break;
		}

		if (pos.x < length && pos.y < length && pos.x > 0 && pos.y > 0) {
			let char = grid[pos.x][pos.y];
			if (char.match(/\w/)) {
				letters += char;
				//console.log(letters);
				if (char === 'Q') inMaze = false;
			}
			if (char === '+') {
				switch(dir) {
					case 'up':
					case 'down':
						if(grid[pos.x-1][pos.y] && grid[pos.x-1][pos.y] !== ' ') dir = 'left';
						else dir = 'right';
						break;
					default:
						if(grid[pos.x][pos.y+1] && grid[pos.x][pos.y+1] !== ' ') dir = 'up';
						else dir = 'down';
						break;
				}
			}
		}
		else inMaze = false;
	}

	console.log("Answer 1: " + letters);
	console.log("Answer 2: " + count);

});
