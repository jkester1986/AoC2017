fs = require('fs');
fs.readFile('Day22.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let lines = data.split('\n');
	let nodes = new Array(25);

	for(var i = 0; i < 25; i++) {
		noes.push(new Array(25));
	}

	for(var y = 0; y < 25; y++) {
		let line = lines[y];
		for(var x = 0; x < 25; x++) {
			nodes[x][y] = line.charAt(x);
		}
	}

	let count = 0;
	let infected = 0;
	let coord = {
		dir: 'n',
		x: 12,
		y: 12
	}

	while(count < 1000) {
		switch(grid[coord.x][coord.y]) {
			case '#':
				grid[coord.x][coord.y] = '.';
				coord = {
					x
				}
				break;
			case '.':
				grid[coord.x][coord.y] '#';
				infected++;
				break;
		}
		count++;
	}


});
