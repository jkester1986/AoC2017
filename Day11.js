fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let directions = data.split(',');
	let length = directions.length;
	directions[length-1] = directions[length-1].split('\n')[0];

	let coordinates = {
		x:0,
		y:0,
		z:0
	}

	let furthest = 0;
	let distance = 0;

	for (var i = 0; i < length; i++) {
		switch(directions[i]) {
			case 'n':
				coordinates.y++;
				coordinates.z--;
				break;
			case 's':
				coordinates.y--;
				coordinates.z++;
				break;
			case 'ne':
				coordinates.x++;
				coordinates.z--;
				break;
			case 'se':
				coordinates.x++;
				coordinates.y--;
				break;
			case 'nw':
				coordinates.y++;
				coordinates.x--;
				break;
			case 'sw':
				coordinates.z++;
				coordinates.x--;
			default:
				break;
		}
		distance = (Math.abs(coordinates.x) + Math.abs(coordinates.y) + Math.abs(coordinates.z))/2;
		if(distance > furthest) furthest = distance;
	}

	distance = (Math.abs(coordinates.x) + Math.abs(coordinates.y) + Math.abs(coordinates.z))/2;
	console.log("Answer 1: " + distance);
	console.log("Answer 2: " + furthest);
});
