fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let directions = data.split(',');
	let length = directions.length;
	directions[length-1] = directions[length-1].split('\n')[0];

	let coordinates = {
		up:0,
		diagonalEast:0,
		diagonalWest:0
	}

	for (var i = 0; i < length; i++) {
		switch(directions[i]) {
			case 'n':
				coordinates.up++;
				break;
			case 's':
				coordinates.up--;
				break;
			case 'ne':
				coordinates.diagonalEast++;
				break;
			case 'se':
				coordinates.diagonalEast--;
				break;
			case 'nw':
				coordinates.diagonalWest++;
				break;
			case 'sw':
				coordinates.diagonalWest--;
			default:
				break;
		}
	}

	console.log(coordinates);
});
